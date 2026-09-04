using UnityEngine;

namespace Galapanidides.World
{
    [CreateAssetMenu(fileName = "UmbralWorldDefinition", menuName = "Galapanidides/World/Umbral World Definition")]
    public sealed class UmbralWorldDefinition : ScriptableObject
    {
        [Header("World scale")]
        [Min(1f)] public float worldWidth = 40f;
        [Min(1f)] public float worldHeight = 22.5f;

        [Header("Layer depth")]
        [Range(0f, 1f)] public float deepFormsParallax = 0.04f;
        [Range(0f, 1f)] public float structuralFormsParallax = 0.10f;
        [Range(0f, 1f)] public float figureAnchorsParallax = 0.16f;
        [Range(0f, 1f)] public float foregroundParallax = 0.24f;

        [Header("Presentation")]
        [Range(0f, 1f)] public float dimensionalFieldIntensity = 0.08f;
        public bool useOrthographicCamera = true;
    }
}
