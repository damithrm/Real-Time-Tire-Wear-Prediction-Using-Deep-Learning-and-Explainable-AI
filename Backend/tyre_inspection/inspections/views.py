# inspections/views.py

import os
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from .models import UploadedImage
from .serializers import UploadedImageSerializer
from .layers import DualAttention  # Import the custom layer
import logging

# Initialize logger
logger = logging.getLogger(__name__)

class ImageUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def load_model(self):
        return load_model(os.path.join(settings.BASE_DIR, 'model', 'final_model.h5'), custom_objects={"DualAttention": DualAttention})

    @tf.function
    def compute_gradients(self, inputs, model):
        with tf.GradientTape() as tape:
            tape.watch(inputs)
            predictions = model(inputs)
        return tape.gradient(predictions, inputs)

    def integrated_gradients(self, inputs, model, baseline=None, steps=50):
        if baseline is None:
            baseline = tf.zeros_like(inputs)
        scaled_inputs = [baseline + (float(i) / steps) * (inputs - baseline) for i in range(0, steps + 1)]
        gradients = [self.compute_gradients(x, model) for x in scaled_inputs]
        avg_gradients = tf.reduce_mean(tf.stack(gradients), axis=0)
        integrated_grads = (inputs - baseline) * avg_gradients
        return integrated_grads

    def compute_gradcam(self, img_array, model):
        integrated_grads = self.integrated_gradients(img_array, model)
        integrated_grads = tf.reduce_sum(tf.abs(integrated_grads), axis=-1).numpy()
        integrated_grads = (integrated_grads - integrated_grads.min()) / (integrated_grads.max() - integrated_grads.min())

        grad_cam_path = os.path.join(settings.MEDIA_ROOT, 'grad_cam', f"{np.random.randint(1, 100000)}.jpg")
        plt.imshow(integrated_grads[0], cmap='viridis')
        plt.colorbar()
        plt.savefig(grad_cam_path)
        plt.close()
        
        return grad_cam_path

    def post(self, request, *args, **kwargs):
        serializer = UploadedImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            img_obj = serializer.instance
            img_path = os.path.join(settings.MEDIA_ROOT, img_obj.image.name)
            try:
                img = image.load_img(img_path, target_size=(299, 299))
                img_array = image.img_to_array(img)
                img_array = np.expand_dims(img_array, axis=0)
                img_array /= 255.0

                model = self.load_model()
                prediction = model.predict(img_array)
                predicted_class = np.argmax(prediction, axis=1)[0]
                classes = ['Alignment Issue', 'Inflation Problem']

                grad_cam_path = self.compute_gradcam(img_array, model)
                grad_cam_url = grad_cam_path.replace(settings.MEDIA_ROOT, settings.MEDIA_URL)

                result = {
                    'prediction': classes[predicted_class],
                    'grad_cam': grad_cam_url
                }
                return Response(result, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error processing image: {e}")
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
