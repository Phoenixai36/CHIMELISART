using UnityEngine;

namespace Galapanidides.World
{
    /// <summary>
    /// Presentation-only dimensional field. No portal/gameplay semantics.
    /// Drives subtle visual modulation that can later be connected to a renderer/shader.
    /// </summary>
    public sealed class DimensionalField : MonoBehaviour
    {
        [SerializeField, Range(0f, 1f)] private float intensity = 0.08f;
        [SerializeField, Min(0f)] private float frequency = 0.35f;
        [SerializeField] private Vector2 drift = new Vector2(0.05f, 0.0f);

        public float Intensity => intensity;
        public Vector2 Drift => drift;

        private float phase;

        private void Update()
        {
            phase += Time.deltaTime * frequency;
            // Intentionally presentation-only. A renderer/shader can consume this value later.
        }

        public float Evaluate(float time)
        {
            return intensity * (0.5f + 0.5f * Mathf.Sin(time * frequency * Mathf.PI * 2f));
        }
    }
}
