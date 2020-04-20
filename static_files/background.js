function loadBackground(scene){
    //load map textures
    //northern skybox
    let bgTexture = new THREE.TextureLoader().load('level/bg1.png');
    bgTexture.generateMipmaps = false;
    bgTexture.minFilter = THREE.NearestFilter;
    bgTexture.magFilter = THREE.NearestFilter;
    let bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
    let bgPlane = new THREE.PlaneGeometry(500, 130);
    const northernBgMesh = new THREE.Mesh(bgPlane, bgMaterial);
    northernBgMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    northernBgMesh.position.x = 0;
    northernBgMesh.position.y = 250;
    northernBgMesh.position.z = 65;
    scene.add(northernBgMesh);

    //northern mountains
    let mtTexture = new THREE.TextureLoader().load('level/mountain2.png');
    mtTexture.generateMipmaps = false;
    mtTexture.minFilter = THREE.NearestFilter;
    mtTexture.magFilter = THREE.NearestFilter;
    mtTexture.wrapS = THREE.RepeatWrapping;
    mtTexture.repeat.x = 2;
    let mtMaterial = new THREE.MeshBasicMaterial({map: mtTexture});
    mtMaterial.transparent = true;
    let mtPlane = new THREE.PlaneGeometry(300, 60);
    const northernMtMesh = new THREE.Mesh(mtPlane, mtMaterial);
    northernMtMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    northernMtMesh.position.x = 0;
    northernMtMesh.position.y = 150;
    northernMtMesh.position.z = 30;
    scene.add(northernMtMesh);

    //northern trees
    let trTexture = new THREE.TextureLoader().load('level/trees1.png');
    trTexture.generateMipmaps = false;
    trTexture.minFilter = THREE.NearestFilter;
    trTexture.magFilter = THREE.NearestFilter;
    trTexture.wrapS = THREE.RepeatWrapping;
    trTexture.repeat.x = 3;
    let trMaterial = new THREE.MeshBasicMaterial({map: trTexture});
    trMaterial.transparent = true;
    let trPlane = new THREE.PlaneGeometry(210, 20);
    const northernTrMesh = new THREE.Mesh(trPlane, trMaterial);
    northernTrMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    northernTrMesh.position.x = 0;
    northernTrMesh.position.y = 105;
    northernTrMesh.position.z = 10;
    scene.add(northernTrMesh);


    //southern skybox
    bgTexture = new THREE.TextureLoader().load('level/bg2.png');
    bgTexture.generateMipmaps = false;
    bgTexture.minFilter = THREE.NearestFilter;
    bgTexture.magFilter = THREE.NearestFilter;
    bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
    bgPlane = new THREE.PlaneGeometry(500, 130);
    const southernBgMesh = new THREE.Mesh(bgPlane, bgMaterial);
    southernBgMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    southernBgMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    southernBgMesh.position.x = 0;
    southernBgMesh.position.y = -250;
    southernBgMesh.position.z = 65;
    scene.add(southernBgMesh);

    //southern mountains
    mtTexture = new THREE.TextureLoader().load('level/mountain2.png');
    mtTexture.generateMipmaps = false;
    mtTexture.minFilter = THREE.NearestFilter;
    mtTexture.magFilter = THREE.NearestFilter;
    mtTexture.wrapS = THREE.RepeatWrapping;
    mtTexture.repeat.x = 2;
    mtMaterial = new THREE.MeshBasicMaterial({map: mtTexture});
    mtMaterial.transparent = true;
    mtPlane = new THREE.PlaneGeometry(300, 60);
    const southernMtMesh = new THREE.Mesh(mtPlane, mtMaterial);
    southernMtMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    southernMtMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    southernMtMesh.position.x = 0;
    southernMtMesh.position.y = -150;
    southernMtMesh.position.z = 30;
    scene.add(southernMtMesh);

    //southern trees
    trTexture = new THREE.TextureLoader().load('level/trees1.png');
    trTexture.generateMipmaps = false;
    trTexture.minFilter = THREE.NearestFilter;
    trTexture.magFilter = THREE.NearestFilter;
    trTexture.wrapS = THREE.RepeatWrapping;
    trTexture.repeat.x = 3;
    trMaterial = new THREE.MeshBasicMaterial({map: trTexture});
    trMaterial.transparent = true;
    trPlane = new THREE.PlaneGeometry(210, 20);
    const southernTrMesh = new THREE.Mesh(trPlane, trMaterial);
    southernTrMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    southernTrMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI);
    southernTrMesh.position.x = 0;
    southernTrMesh.position.y = -105;
    southernTrMesh.position.z = 10;
    scene.add(southernTrMesh);

    //eastern skybox
    bgTexture = new THREE.TextureLoader().load('level/bg2.png');
    bgTexture.generateMipmaps = false;
    bgTexture.minFilter = THREE.NearestFilter;
    bgTexture.magFilter = THREE.NearestFilter;
    bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
    bgPlane = new THREE.PlaneGeometry(500, 130);
    const easternBgMesh = new THREE.Mesh(bgPlane, bgMaterial);
    easternBgMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    easternBgMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), 3 * Math.PI / 2);
    easternBgMesh.position.x = 250;
    easternBgMesh.position.y = 0;
    easternBgMesh.position.z = 65;
    scene.add(easternBgMesh);

    //eastern mountains
    mtTexture = new THREE.TextureLoader().load('level/mountain2.png');
    mtTexture.generateMipmaps = false;
    mtTexture.minFilter = THREE.NearestFilter;
    mtTexture.magFilter = THREE.NearestFilter;
    mtTexture.wrapS = THREE.RepeatWrapping;
    mtTexture.repeat.x = 2;
    mtMaterial = new THREE.MeshBasicMaterial({map: mtTexture});
    mtMaterial.transparent = true;
    mtPlane = new THREE.PlaneGeometry(300, 60);
    const easternMtMesh = new THREE.Mesh(mtPlane, mtMaterial);
    easternMtMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    easternMtMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), 3 * Math.PI / 2);
    easternMtMesh.position.x = 150;
    easternMtMesh.position.y = 0;
    easternMtMesh.position.z = 30;
    scene.add(easternMtMesh);

    //eastern trees
    trTexture = new THREE.TextureLoader().load('level/trees1.png');
    trTexture.generateMipmaps = false;
    trTexture.minFilter = THREE.NearestFilter;
    trTexture.magFilter = THREE.NearestFilter;
    trTexture.wrapS = THREE.RepeatWrapping;
    trTexture.repeat.x = 3;
    trMaterial = new THREE.MeshBasicMaterial({map: trTexture});
    trMaterial.transparent = true;
    trPlane = new THREE.PlaneGeometry(210, 20);
    const easternTrMesh = new THREE.Mesh(trPlane, trMaterial);
    easternTrMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    easternTrMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), 3 * Math.PI / 2);
    easternTrMesh.position.x = 105;
    easternTrMesh.position.y = 0;
    easternTrMesh.position.z = 10;
    scene.add(easternTrMesh);

    //western skybox
    bgTexture = new THREE.TextureLoader().load('level/bg2.png');
    bgTexture.generateMipmaps = false;
    bgTexture.minFilter = THREE.NearestFilter;
    bgTexture.magFilter = THREE.NearestFilter;
    bgMaterial = new THREE.MeshBasicMaterial({map: bgTexture});
    bgPlane = new THREE.PlaneGeometry(500, 130);
    const westernBgMesh = new THREE.Mesh(bgPlane, bgMaterial);
    westernBgMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    westernBgMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    westernBgMesh.position.x = -250;
    westernBgMesh.position.y = 0;
    westernBgMesh.position.z = 65;
    scene.add(westernBgMesh);

    //western mountains
    mtTexture = new THREE.TextureLoader().load('level/mountain2.png');
    mtTexture.generateMipmaps = false;
    mtTexture.minFilter = THREE.NearestFilter;
    mtTexture.magFilter = THREE.NearestFilter;
    mtTexture.wrapS = THREE.RepeatWrapping;
    mtTexture.repeat.x = 2;
    mtMaterial = new THREE.MeshBasicMaterial({map: mtTexture});
    mtMaterial.transparent = true;
    mtPlane = new THREE.PlaneGeometry(300, 60);
    const westernMtMesh = new THREE.Mesh(mtPlane, mtMaterial);
    westernMtMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    westernMtMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    westernMtMesh.position.x = -150;
    westernMtMesh.position.y = 0;
    westernMtMesh.position.z = 30;
    scene.add(westernMtMesh);

    //western trees
    trTexture = new THREE.TextureLoader().load('level/trees1.png');
    trTexture.generateMipmaps = false;
    trTexture.minFilter = THREE.NearestFilter;
    trTexture.magFilter = THREE.NearestFilter;
    trTexture.wrapS = THREE.RepeatWrapping;
    trTexture.repeat.x = 3;
    trMaterial = new THREE.MeshBasicMaterial({map: trTexture});
    trMaterial.transparent = true;
    trPlane = new THREE.PlaneGeometry(210, 20);
    const westernTrMesh = new THREE.Mesh(trPlane, trMaterial);
    westernTrMesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
    westernTrMesh.rotateOnAxis(new THREE.Vector3(0, 1, 0), Math.PI / 2);
    westernTrMesh.position.x = -105;
    westernTrMesh.position.y = 0;
    westernTrMesh.position.z = 10;
    scene.add(westernTrMesh);

    //ground outside race track
    let grTexture = new THREE.TextureLoader().load('level/grass.jpg');
    grTexture.generateMipmaps = false;
    grTexture.minFilter = THREE.NearestFilter;
    grTexture.magFilter = THREE.NearestFilter;
    grTexture.wrapS = THREE.RepeatWrapping;
    let grMaterial = new THREE.MeshBasicMaterial({map: grTexture});
    let grPlane = new THREE.PlaneGeometry(500, 500);
    const grMesh = new THREE.Mesh(grPlane, grMaterial);
    grMesh.position.z = -0.1; 
    scene.add(grMesh);
};