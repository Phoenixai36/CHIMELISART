using UnityEngine;

namespace Galapanidides.World
{
    [CreateAssetMenu(fileName = "UmbralLayerProfile", menuName = "Galapanidides/World/Umbral Layer Profile")]
    public sealed class UmbralLayerProfile : ScriptableObject
    {
        [System.Serializable]
        public struct Layer
        {
            public string id;
            [Range(-1f, 1f)] public float parallax;
            public int sortingOrder;
            [Range(0f, 1f)] public float opacity;
            [Range(0f, 1f)] public float lightInfluence;
        }

        public Layer[] layers =
        {
            new Layer { id = "PaperVoid", parallax = 0.00f, sortingOrder = 0, opacity = 1f, lightInfluence = 0.10f },
            new Layer { id = "DeepForms", parallax = 0.04f, sortingOrder = 10, opacity = 1f, lightInfluence = 0.25f },
            new Layer { id = "StructuralForms", parallax = 0.10f, sortingOrder = 20, opacity = 1f, lightInfluence = 0.45f },
            new Layer { id = "FigureAnchors", parallax = 0.16f, sortingOrder = 30, opacity = 1f, lightInfluence = 0.60f },
            new Layer { id = "ForegroundFragments", parallax = 0.24f, sortingOrder = 40, opacity = 1f, lightInfluence = 0.75f },
            new Layer { id = "DimensionalField", parallax = 0.30f, sortingOrder = 50, opacity = 0.20f, lightInfluence = 0.00f }
        };
    }
}
