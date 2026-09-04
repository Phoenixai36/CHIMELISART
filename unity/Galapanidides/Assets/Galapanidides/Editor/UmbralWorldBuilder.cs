#if UNITY_EDITOR
using UnityEditor;
using UnityEngine;
using UnityEngine.Rendering.Universal;
using Galapanidides.World;

namespace Galapanidides.Editor
{
    public static class UmbralWorldBuilder
    {
        private const string RootName = "GALAPANIDIDES_UMBRAL_WORLD";

        [MenuItem("Galapanidides/Build World/Generate Umbral Scene")]
        public static void Generate()
        {
            var existing = GameObject.Find(RootName);
            if (existing != null)
            {
                if (!EditorUtility.DisplayDialog("Galapanídides", "The Umbral world already exists. Rebuild it?", "Rebuild", "Cancel"))
                    return;
                Object.DestroyImmediate(existing);
            }

            var root = new GameObject(RootName);
            var world = NewChild("World", root.transform);
            NewChild("PaperVoid", world.transform);
            NewChild("DeepForms", world.transform);
            NewChild("StructuralForms", world.transform);
            NewChild("FigureAnchors", world.transform);
            NewChild("ForegroundFragments", world.transform);
            var field = NewChild("DimensionalField", world.transform);
            field.AddComponent<DimensionalField>();

            var lighting = NewChild("Lighting", root.transform);
            var globalLight = lighting.AddComponent<Light2D>();
            globalLight.lightType = Light2D.LightType.Global;
            globalLight.intensity = 0.15f;

            var cameraObject = NewChild("Camera", root.transform);
            var camera = cameraObject.AddComponent<Camera>();
            camera.orthographic = true;
            camera.orthographicSize = 11.25f;
            camera.transform.position = new Vector3(0f, 0f, -10f);

            NewChild("Presentation", root.transform);

            Selection.activeGameObject = root;
            Undo.RegisterCreatedObjectUndo(root, "Generate Galapanidides Umbral World");
            EditorSceneManager.MarkSceneDirty(EditorSceneManager.GetActiveScene());
            Debug.Log("Galapanidides: generated world scaffold. Art assets and gameplay remain intentionally unassigned.");
        }

        private static GameObject NewChild(string name, Transform parent)
        {
            var go = new GameObject(name);
            go.transform.SetParent(parent, false);
            return go;
        }
    }
}
#endif
