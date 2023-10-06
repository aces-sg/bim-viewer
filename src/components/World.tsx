import React, { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createSubmission } from "@/graphql/mutations";
import * as OBC from "openbim-components";
import * as THREE from "three";

export default function World() {
  const [modelCount, setModelCount] = React.useState(0);

  async function updateSubmissionInput() {
    try {
      let res = await API.graphql(
        graphqlOperation(createSubmission, {
          input: { modelId: "testId", modelUrl: "testUrl" },
        })
      );
      console.log("response is", res);
    } catch (err) {
      console.log("error in form submission: ", err);
    }
  }

  useEffect(() => {
    const viewer = new OBC.Components();

    const sceneComponent = new OBC.SimpleScene(viewer);
    viewer.scene = sceneComponent;
    const scene = sceneComponent.get();
    const ambientLight = new THREE.AmbientLight(0xe6e7e4, 1);
    const directionalLight = new THREE.DirectionalLight(0xf9f9f9, 0.75);
    directionalLight.position.set(10, 50, 10);
    scene.add(ambientLight, directionalLight);
    scene.background = new THREE.Color("#202932");

    const viewerContainer = document.getElementById(
      "viewerContainer"
    ) as HTMLDivElement;
    const rendererComponent = new OBC.PostproductionRenderer(
      viewer,
      viewerContainer
    );
    viewer.renderer = rendererComponent;

    const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer);
    viewer.camera = cameraComponent;

    const raycasterComponent = new OBC.SimpleRaycaster(viewer);
    viewer.raycaster = raycasterComponent;

    viewer.init();
    cameraComponent.updateAspect();
    rendererComponent.postproduction.enabled = true;

    new OBC.SimpleGrid(viewer, new THREE.Color(0x666666));

    const fragmentManager = new OBC.FragmentManager(viewer);
    const ifcLoader = new OBC.FragmentIfcLoader(viewer);

    const exportButton = new OBC.Button(viewer);
    exportButton.materialIcon = "exit_to_app";
    exportButton.tooltip = "Export model";

    const highlighter = new OBC.FragmentHighlighter(viewer);
    highlighter.setup();

    const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer);
    highlighter.events.select.onClear.add(() => {
      propertiesProcessor.cleanPropertiesList();
    });

    ifcLoader.onIfcLoaded.add((model) => {
      setModelCount(fragmentManager.groups.length);
      propertiesProcessor.process(model);
      highlighter.events.select.onHighlight.add((selection) => {
        const fragmentID = Object.keys(selection)[0];
        const expressID = Number([...selection[fragmentID]][0]);
        propertiesProcessor.renderProperties(model, expressID);
      });
      highlighter.update();
    });

    const mainToolbar = new OBC.Toolbar(viewer);
    mainToolbar.addChild(
      ifcLoader.uiElement.get("main"),
      propertiesProcessor.uiElement.get("main"),
      exportButton
    );
    viewer.ui.addToolbar(mainToolbar);
    (viewer.camera as OBC.OrthoPerspectiveCamera).controls?.setLookAt(
      10,
      10,
      10,
      0,
      0,
      0
    );
  }, []);

  useEffect(() => {
    console.log("hello world");
    updateSubmissionInput();
  }, []);

  const viewerContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    gridArea: "viewer",
  };

  const titleStyle: React.CSSProperties = {
    position: "absolute",
    top: "15px",
    left: "15px",
  };

  return (
    <>
      <div id="viewerContainer" style={viewerContainerStyle}>
        <h3 style={titleStyle}>Models loaded: {modelCount}</h3>
      </div>
    </>
  );
}
