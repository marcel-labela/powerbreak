let scene, camera, renderer, controls;

const init = () => {
  scene = new THREE.Scene();
  const materialArray = [];

  camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 45, 300000);
  camera.position.set(-900,-200,900);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  const texture_ft = new THREE.TextureLoader().load( '/assets/corona_ft.png');
  const texture_bk = new THREE.TextureLoader().load( '/assets/corona_bk.png');
  const texture_up = new THREE.TextureLoader().load( '/assets/corona_up.png');
  const texture_dn = new THREE.TextureLoader().load( '/assets/corona_dn.png');
  const texture_rt = new THREE.TextureLoader().load( '/assets/corona_rt.png');
  const texture_lf = new THREE.TextureLoader().load( 'assets/corona_lf.png');

  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

  for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

  const geometry = new THREE.BoxGeometry(10000, 10000, 10000);
  const skybox = new THREE.Mesh(geometry, materialArray);
  scene.add(skybox);

  // EARTH SPHERE
  const sphereGeometry = new THREE.SphereGeometry(100, 270, 90);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('/assets/earthTextureMap.jpeg')
  });

  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);

  sphere.position.x = 1250;
  sphere.position.z = -1250;

  // SUN SPHERE
  const sunGeometry = new THREE.SphereGeometry(550, 820, 660);
  const sunMaterial = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('/assets/sunTextureMap.jpeg')
  });

  const sunSphere = new THREE.Mesh(sunGeometry, sunMaterial);
  scene.add(sunSphere);

  sunSphere.position.x = 150;
  sunSphere.position.z = -175;

  const render = () => renderer.render(scene, camera);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render);
  controls.minDistance = 300;
  controls.maxDistance = 4500;

  const animate = () => {
    sphere.rotation.y += 0.001;

    render();
    requestAnimationFrame(animate);
  };

  animate();
}

init();