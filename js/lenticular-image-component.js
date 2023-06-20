AFRAME.registerComponent("lenticular-image", {
    schema: {
        img1: { type: "string", default: "" },
        img2: { type: "string", default: "" }
    },

    init: function () {
        const IMG_URLS = [this.data.img1, this.data.img2];
        const entityObject3D = this.el.object3D;
        // Create a group to hold the lenticular mesh
        const lenticularGroup = new THREE.Group();
        // Set the position, rotation, and scale of the lenticular group based on the entity's attributes
        lenticularGroup.position.set(entityObject3D.position.x, entityObject3D.position.y, entityObject3D.position.z);
        lenticularGroup.rotation.set(entityObject3D.rotation.x, entityObject3D.rotation.y, entityObject3D.rotation.z);
        lenticularGroup.scale.set(entityObject3D.scale.x, entityObject3D.scale.y, entityObject3D.scale.z);

        // Create the lenticular mesh
        const W = 10,
            H = 10,
            SW = W * 20,
            SH = H * 20;
        const vs = [];
        for (let i = 0, I = SH; i < I; ++i) {
            vs[i] = [];
            const nY = i / (I - 1);
            for (let j = 0, J = SW; j < J; ++j) {
                const nX = j / (J - 1);
                vs[i][j] = {
                    uv: [nX, nY],
                    xyz: [(nX - 0.5) * W, (nY - 0.5) * H, (i + 1) % 2 * (j % 2) * 0.5 - 0.25]
                };
            }
        }
        const geoms = [];
        for (let k = 0; k <= 1; ++k) {
            const geom = new THREE.BufferGeometry();
            const N = ((SW - k) >> 1) * (SH - 1);
            const pos = new Float32Array(N * 3 * 6); // six (x,y,z)
            const uv = new Float32Array(N * 2 * 6); // six (u,v)
            let n = 0;
            for (let i = 0, I = SH - 1; i < I; ++i) {
                for (let j = k, J = SW - 1; j < J; j += 2) {
                    let v = vs[i][j];
                    pos.set(v.xyz, n * 3);
                    uv.set(v.uv, n * 2);
                    ++n;
                    v = vs[i][j + 1];
                    pos.set(v.xyz, n * 3);
                    uv.set(v.uv, n * 2);
                    ++n;
                    v = vs[i + 1][j];
                    pos.set(v.xyz, n * 3);
                    uv.set(v.uv, n * 2);
                    ++n;
                    v = vs[i][j + 1];
                    pos.set(v.xyz, n * 3);
                    uv.set(v.uv, n * 2);
                    ++n
                    v = vs[i + 1][j + 1];
                    pos.set(v.xyz, n * 3);
                    uv.set(v.uv, n * 2);
                    ++n;
                    v = vs[i + 1][j];
                    pos.set(v.xyz, n * 3);
                    uv.set(v.uv, n * 2);
                    ++n;
                }
            }
            geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
            geom.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
            geom.computeVertexNormals();
            geoms.push(geom);
        }

        //// Make Meshes 

        const g = new THREE.Group();
        for (const [i, geom] of geoms.entries()) {
            const map = new THREE.TextureLoader().load(IMG_URLS[i]);
            const mat = new THREE.MeshLambertMaterial({ map, side: THREE.DoubleSide });
            const mesh = new THREE.Mesh(geoms[i], mat);
            g.add(mesh);
        }
        // Add the lenticular mesh to the group
        lenticularGroup.add(g);
        // Add the lenticular group to the entity's object3D
        entityObject3D.add(lenticularGroup);
    },

    update: function () {
        // Get the current entity's object3D
        const entityObject3D = this.el.object3D;
        // Get the lenticular group from the entity's object3D
        const lenticularGroup = entityObject3D.children[0];
        // Set the position, rotation, and scale of the lenticular group based on the entity's updated attributes
        lenticularGroup.position.set(entityObject3D.position.x, entityObject3D.position.y, entityObject3D.position.z);
        lenticularGroup.rotation.set(entityObject3D.rotation.x, entityObject3D.rotation.y, entityObject3D.rotation.z);
        lenticularGroup.scale.set(entityObject3D.scale.x, entityObject3D.scale.y, entityObject3D.scale.z);
    }
});