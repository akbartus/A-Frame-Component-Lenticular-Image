# A-Frame-Component-Lenticular-Image
<img src="img/screenshot.jpg" title="Video screen capture" alt="Video screen capture" height="400">

### **Description / Rationale**
This is A-Frame component for creating lenticular image effects in AR and VR. The original source code was taken from <a href="https://twitter.com/ycwhk?lang=en">YCW</a>'s <a href="https://codepen.io/ycw/pen/xxVPMwB">Codepen Repository</a> and various modifications adapted to A-Frame environment.


### **Instructions**
In order to use the component attach "simplify-modifier" to a-entity with gltf-model component. The component has the following attributes: 
* <b>color: { type: 'color', default: '#ffffff' }</b> - Color of the simplified mesh
* <b>wireframe: { type: 'boolean', default: false }</b> - Whether to show wireframe of simplified mesh or not
* <b>count: { type: 'number', default: 0.7 }</b> - Vertices to remove. Accepts values from 0 to 1. 0 - almost no simplifaction is made. 1 - complete simplification. Please note that if 1 is selected, mesh will not be visible. 
* <b>offset: { type: 'number', default: 1 }</b> - Offset of simplified mesh on x-axis. If 0 is selected, it will be in the same position as original GLTF model.

The code below shows the sample implementation of the component:
```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>A-Frame Component: Simplify Modifier</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
    <script src="https://aframe.io/releases/1.4.2/aframe.min.js"></script>
    <script src="js/simplifymodifier-component.js"></script>
</head>
<body>
    <a-scene>
        <a-entity simplify-modifier="color: lightblue" gltf-model="3d/LeePerrySmith.glb" position="-1 1.5 -2" rotation="0 0 0" scale="0.2 0.2 0.2" scale="0.01 0.01 0.01"></a-entity>
        <a-sky color="#000"></a-sky>
    </a-scene>
</body>
</html>
```
Please not that meshes without textures are only supported. When doing simplification if mesh is not visible, try to decrease the count value. 

### **Tech Stack**
The project is powered by AFrame and Three.js. The 3d model (gltf file) was taken from <a href="https://github.com/mrdoob/three.js/tree/dev/examples/models/gltf/LeePerrySmith">Three.js repository</a>.

### **Demo**
See demo of the component here: [Demo](https://simplify-modifier.glitch.me/)
