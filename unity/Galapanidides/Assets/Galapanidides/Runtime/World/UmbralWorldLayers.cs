using UnityEngine;

namespace Galapanidides.World
{
    /// <summary>
    /// Applies the world-layer presentation model without coupling it to gameplay.
    /// </summary>
    public sealed class UmbralWorldLayers : MonoBehaviour
    {
        [System.Serializable]
        private struct Layer
        {
            public Transform root;
            [Range(0f, 1f)] public float parallax;
            public float depth;
        }

        [SerializeField] private Transform cameraTransform;
        [SerializeField] private Layer[] layers;
        [SerializeField] private float parallaxScale = 0.08f;

        private Vector3 lastCameraPosition;

        private void Awake()
        {
            if (cameraTransform != null)
                lastCameraPosition = cameraTransform.position;
        }

        private void LateUpdate()
        {
            if (cameraTransform == null || layers == null)
                return;

            var delta = cameraTransform.position - lastCameraPosition;
            foreach (var layer in layers)
            {
                if (layer.root == null)
                    continue;

                var movement = new Vector3(delta.x, delta.y, 0f) * (layer.parallax * parallaxScale);
                layer.root.position += movement;
                var position = layer.root.position;
                position.z = layer.depth;
                layer.root.position = position;
            }

            lastCameraPosition = cameraTransform.position;
        }
    }
}
