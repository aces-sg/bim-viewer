import React from 'react'
import * as OBC from "openbim-components"
import * as THREE from "three"

const Viewer = () => {
  const [modelCount, setModelCount] = React.useState(0)

  const init = async () => {
    const {GUI} = await import('dat.gui')

    // ... rest of initializing and setting model rendering
    const viewer = new OBC.Components()

    const sceneComponent = new OBC.SimpleScene(viewer)
    sceneComponent.setup()
    viewer.scene = sceneComponent

    const viewerContainer = document.getElementById("viewerContainer") as HTMLDivElement
    const rendererComponent = new OBC.PostproductionRenderer(viewer, viewerContainer)
    viewer.renderer = rendererComponent
    const postproduction = rendererComponent.postproduction

    const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer)
    viewer.camera = cameraComponent
    // 
    cameraComponent.controls.setLookAt(10, 10, 10, 0, 0, 0);
    // 

    const raycasterComponent = new OBC.SimpleRaycaster(viewer)
    viewer.raycaster = raycasterComponent


    // 
    const hider = new OBC.FragmentHider(viewer);
    hider.loadCached();
    
    // 
    const classifier = new OBC.FragmentClassifier(viewer);

    viewer.init()
    cameraComponent.updateAspect()
    postproduction.enabled = true

    cameraComponent.projectionChanged.add(() => {
      const projection = cameraComponent.getProjection();
      grid.fade = projection === 'Perspective';
    });

    const grid = new OBC.SimpleGrid(viewer, new THREE.Color(0x666666))
    
    const fragmentManager = new OBC.FragmentManager(viewer)
    const ifcLoader = new OBC.FragmentIfcLoader(viewer)

    const highlighter = new OBC.FragmentHighlighter(viewer)
    highlighter.setup()
    rendererComponent.postproduction.customEffects.outlineEnabled = true
    highlighter.outlineEnabled = true

    const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer)
    highlighter.events.select.onClear.add(() => {
      propertiesProcessor.cleanPropertiesList()
    })

    // Define Model tree views and initializing
    const modelTree = new OBC.FragmentTree(viewer);
    await modelTree.init();
    // 

    // loading ifc file and processing its properties
   ifcLoader.onIfcLoaded.add(async (model) => {
      setModelCount(fragmentManager.groups.length)
      propertiesProcessor.process(model)
      highlighter.events.select.onHighlight.add((selection) => {
        const fragmentID = Object.keys(selection)[0]
        const expressID = Number([...selection[fragmentID]][0])

        for (const group of fragmentManager.groups) {
          const fragmentFound = Object.values(group.keyFragments).find(id => id === fragmentID)
          if (fragmentFound) model = group;
        }
        propertiesProcessor.renderProperties(model, expressID)
      })


      ////////////// configuration FragmentTree with loaded ifc file model  ////////////////// 
      modelTree.update(['storeys', 'entities']);
      classifier.byStorey(model);
      classifier.byEntity(model);

      modelTree.onSelected.add((filter) => {
        highlighter.highlightByID('select', filter, true, true);
      });

      modelTree.onHovered.add((filter) => {
        highlighter.highlightByID('hover', filter);
      });
      ////////////////////////////////

      ////////////  configuration for model hide or display ////////////////////
      const classifications = classifier.get();

      const storeys: any = {};
      const storeyNames = Object.keys(classifications.storeys);
      for (const name of storeyNames) {
        storeys[name] = true;
      }

      const classes: any = {};
      const classNames = Object.keys(classifications.entities);
      for (const name of classNames) {
        classes[name] = true;
      }

      const gui = new GUI();
      const storeysGui = gui.addFolder("Storeys");
      for (const name in storeys) {
        storeysGui.add(storeys, name).onChange(async (visible: any) => {
          const found = await classifier.find({ storeys: [name] });
          hider.set(visible, found);
        });
      }

      const entitiesGui = gui.addFolder("Classes");
      for (const name in classes) {
        entitiesGui.add(classes, name).onChange(async (visible: any) => {
          const found = await classifier.find({ entities: [name] });
          hider.set(visible, found);
        });
      }
      // // // // // // // // // 

      highlighter.update()
    })

    ////////////// Creating mainToolbar and setting its menus //////////////////
    const mainToolbar = new OBC.Toolbar(viewer)
    mainToolbar.addChild(
      // IFC file loading menu
      ifcLoader.uiElement.get("main"),
      // Porperty menu
      propertiesProcessor.uiElement.get("main"),
      // Fragment Tree menu
      modelTree.uiElement.get("main"),
      // Filtering & popup for model hide or show 
      hider.uiElement.get("main"),
      // Camera menu
      cameraComponent.uiElement.get("main"),
    )

    viewer.ui.addToolbar(mainToolbar)
 }

  React.useEffect(() => {
    init();
  }, [])

  const viewerContainerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    position: "relative",
    gridArea: "viewer"
  }

  const titleStyle: React.CSSProperties = {
    position: "absolute",
    top: "15px",
    left: "15px",
    zIndex: 1
  }

  return (
    <>
      <div id="viewerContainer" style={viewerContainerStyle}>
        <h3 style={titleStyle}>Models loaded: {modelCount}</h3>
      </div>
    </>
  )
}

export default Viewer;