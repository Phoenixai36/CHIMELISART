using UnityEngine;

namespace Galapanidides.World
{
    /// <summary>
    /// Editor/runtime diagnostic checks for the world scaffold. No gameplay dependencies.
    /// </summary>
    public sealed class UmbralWorldValidation : MonoBehaviour
    {
        [SerializeField] private bool logOnStart = true;

        private void Start()
        {
            if (!logOnStart)
                return;

            Validate();
        }

        [ContextMenu("Validate Umbral World")]
        public void Validate()
        {
            var root = transform;
            CheckChild(root, "World");
            CheckChild(root, "Lighting");
            CheckChild(root, "Camera");
            CheckChild(root, "Presentation");

            var world = root.Find("World");
            if (world == null)
                return;

            CheckChild(world, "PaperVoid");
            CheckChild(world, "DeepForms");
            CheckChild(world, "StructuralForms");
            CheckChild(world, "FigureAnchors");
            CheckChild(world, "ForegroundFragments");
            CheckChild(world, "DimensionalField");

            Debug.Log("Galapanidides: Umbral world structural validation completed.", this);
        }

        private static void CheckChild(Transform parent, string childName)
        {
            if (parent.Find(childName) == null)
                Debug.LogWarning($"Galapanidides: missing expected world node '{childName}'.", parent);
        }
    }
}
