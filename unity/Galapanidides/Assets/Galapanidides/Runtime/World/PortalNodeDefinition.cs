using UnityEngine;

namespace Galapanidides.World
{
    public enum RealityKind
    {
        Galapanidides,
        Human,
        Unknown,
        DarkMatter
    }

    [CreateAssetMenu(fileName = "PortalNodeDefinition", menuName = "Galapanidides/World/Portal Node Definition")]
    public sealed class PortalNodeDefinition : ScriptableObject
    {
        public string nodeId = "NODE_001";
        public RealityKind reality = RealityKind.Unknown;

        [Header("Traversal")]
        [Min(0f)] public float stability = 1f;
        public bool damaged;
        public bool hiddenFromHumans = true;

        [Header("Source traceability")]
        [TextArea(2, 6)] public string sourceEvidence;
        public string sourceVideo;
        public string sourceFrame;
    }
}
