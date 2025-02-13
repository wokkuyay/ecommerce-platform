# app.py
from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

app = Flask(__name__)

# ------------------------------
# Define the Two-Tower Model Components
# ------------------------------

def create_user_tower():
    """Creates the user tower model."""
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(3,)),           # Assume user features are 3-dimensional
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(5, activation='linear')  # Output user embedding (5-dimensional)
    ])
    return model

def create_item_tower():
    """Creates the item tower model."""
    model = tf.keras.Sequential([
        tf.keras.layers.Input(shape=(3,)),           # Assume item features are 3-dimensional
        tf.keras.layers.Dense(8, activation='relu'),
        tf.keras.layers.Dense(5, activation='linear')  # Output item embedding (5-dimensional)
    ])
    return model

# Instantiate the towers. In a production system, you’d load pre-trained weights here.
user_tower = create_user_tower()
item_tower = create_item_tower()

# ------------------------------
# Recommendation Endpoint
# ------------------------------

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    # Retrieve the userId from query parameters.
    user_id = request.args.get('userId')
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    # Simulate a user feature vector (for example purposes, using random data).
    # In production, you would retrieve real features based on the userId.
    user_features = np.random.rand(3)  # Shape: (3,)
    user_features = np.expand_dims(user_features, axis=0)  # Shape: (1,3)

    # Get the user embedding from the user tower.
    user_embedding = user_tower.predict(user_features)  # Shape: (1,5)

    # Simulate a set of 10 items, each with its own random feature vector.
    num_items = 10
    item_features = np.random.rand(num_items, 3)  # Shape: (10,3)

    # Get the item embeddings from the item tower.
    item_embeddings = item_tower.predict(item_features)  # Shape: (10,5)

    # Compute dot product similarities between the user embedding and each item embedding.
    # This gives a score for each item.
    scores = np.dot(item_embeddings, user_embedding.T)  # Shape: (10,1)
    scores = scores.flatten()  # Convert to a 1D array of shape: (10,)

    # Get the indices of the top 3 recommended items.
    top_indices = scores.argsort()[-3:][::-1].tolist()

    # Return the recommendations in a JSON response.
    return jsonify({
        "userId": user_id,
        "recommendations": top_indices,
        "scores": scores.tolist()  # Optional: include scores for transparency
    })

# ------------------------------
# Run the Flask Application
# ------------------------------

if __name__ == '__main__':
    # In production, you would use a production-ready WSGI server (like Gunicorn) instead of Flask's built-in server.
    app.run(debug=True, host='0.0.0.0', port=5001)
