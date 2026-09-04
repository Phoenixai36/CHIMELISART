using UnityEngine;

namespace Galapanidides.World
{
    /// <summary>
    /// Presentation-only parallax rig for the Umbral world.
    /// It intentionally contains no gameplay or player-control logic.
    /// </summary>
    public sealed class UmbralParallaxRig : MonoBehaviour
    {
        [SerializeField] private Transform cameraTransform;
        [SerializeField] private Transform deepForms;
        [SerializeField] private Transform structuralForms;
        [SerializeField] private Transform figureAnchors;
        [SerializeField] private Transform foregroundFragments;

        [SerializeField, Range(0f, 1f)] private float deepAmount = 0.04f;
        [SerializeField, Range(0f, 1f)] private float structuralAmount = 0.10f;
        [SerializeField, Range(0f, 1f)] private float figureAmount = 0.16f;
        [SerializeField, Range(0f, 1f)] private float foregroundAmount = 0.24f;

        private Vector3 _cameraOrigin;
        private Vector3 _deepOrigin;
        private Vector3 _structuralOrigin;
        private Vector3 _figureOrigin;
        private Vector3 _foregroundOrigin;

        private void Awake()
        {
            if (cameraTransform == null)
                cameraTransform = Camera.main != null ? Camera.main.transform : null;

            if (cameraTransform == null)
                return;

            _cameraOrigin = cameraTransform.position;
            CaptureOrigins();
        }

        private void LateUpdate()
        {
            if (cameraTransform == null)
                return;

            Vector3 delta = cameraTransform.position - _cameraOrigin;
            Apply(deepForms, _deepOrigin, delta, deepAmount);
            Apply(structuralForms, _structuralOrigin, delta, structuralAmount);
            Apply(figureAnchors, _figureOrigin, delta, figureAmount);
            Apply(foregroundFragments, _foregroundOrigin, delta, foregroundAmount);
        }

        private void CaptureOrigins()
        {
            if (deepForms != null) _deepOrigin = deepForms.position;
            if (structuralForms != null) _structuralOrigin = structuralForms.position;
            if (figureAnchors != null) _figureOrigin = figureAnchors.position;
            if (foregroundFragments != null) _foregroundOrigin = foregroundFragments.position;
        }

        private static void Apply(Transform layer, Vector3 origin, Vector3 cameraDelta, float amount)
        {
            if (layer == null) return;
            layer.position = origin + cameraDelta * amount;
        }
    }
}
