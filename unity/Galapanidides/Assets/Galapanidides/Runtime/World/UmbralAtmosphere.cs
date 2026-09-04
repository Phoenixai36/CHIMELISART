using UnityEngine;

namespace Galapanidides.World
{
    /// <summary>
    /// Presentation-only atmosphere controller for the Umbral world.
    /// Drives slow, deterministic modulation without introducing gameplay state.
    /// </summary>
    public sealed class UmbralAtmosphere : MonoBehaviour
    {
        [SerializeField, Min(0f)] private float pulseSpeed = 0.08f;
        [SerializeField, Range(0f, 1f)] private float pulseAmount = 0.06f;
        [SerializeField, Min(0f)] private float driftSpeed = 0.03f;
        [SerializeField, Min(0f)] private float driftDistance = 0.12f;

        private Vector3 initialPosition;
        private float phase;

        private void Awake()
        {
            initialPosition = transform.localPosition;
            phase = Random.value * Mathf.PI * 2f;
        }

        private void Update()
        {
            var t = Time.time;
            var pulse = 1f + Mathf.Sin(t * pulseSpeed * Mathf.PI * 2f + phase) * pulseAmount;
            var drift = Mathf.Sin(t * driftSpeed * Mathf.PI * 2f + phase) * driftDistance;

            transform.localScale = Vector3.one * pulse;
            transform.localPosition = initialPosition + Vector3.up * drift;
        }
    }
}
