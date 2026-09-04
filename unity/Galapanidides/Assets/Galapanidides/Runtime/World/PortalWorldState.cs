using System;
using UnityEngine;

namespace Galapanidides.World
{
    /// <summary>
    /// Presentation-safe world state for the dimensional network.
    /// It intentionally contains no player, combat or progression logic.
    /// </summary>
    public sealed class PortalWorldState : MonoBehaviour
    {
        [Serializable]
        public struct PortalState
        {
            public string nodeId;
            [Range(0f, 1f)] public float stability;
            public bool accessible;
        }

        [SerializeField] private PortalState[] portals = Array.Empty<PortalState>();
        [Range(0f, 1f)] [SerializeField] private float spaceTimeDistortion;

        public PortalState[] Portals => portals;
        public float SpaceTimeDistortion => spaceTimeDistortion;

        public bool IsTraversable(string nodeId)
        {
            for (var i = 0; i < portals.Length; i++)
            {
                if (string.Equals(portals[i].nodeId, nodeId, StringComparison.Ordinal))
                    return portals[i].accessible && portals[i].stability > 0f;
            }

            return false;
        }

        public void SetSpaceTimeDistortion(float value)
        {
            spaceTimeDistortion = Mathf.Clamp01(value);
        }
    }
}
