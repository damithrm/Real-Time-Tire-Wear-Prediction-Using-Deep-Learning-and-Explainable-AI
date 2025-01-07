# inspections/layers.py

import tensorflow as tf
from tensorflow.keras.layers import Layer, Dense

class DualAttention(Layer):
    def __init__(self, input_dim, **kwargs):
        super(DualAttention, self).__init__(**kwargs)
        self.input_dim = input_dim
        self.query = Dense(input_dim)
        self.key = Dense(input_dim)
        self.value = Dense(input_dim)

    def call(self, inputs):
        query = self.query(inputs)
        key = self.key(inputs)
        value = self.value(inputs)

        attention_scores = tf.matmul(query, key, transpose_b=True)
        attention_weights = tf.nn.softmax(attention_scores, axis=-1)
        attention_output = tf.matmul(attention_weights, value)

        return attention_output
