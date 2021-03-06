const THREE = require('three');
const glslify = require('glslify');
const MathEx = require('js-util/MathEx');

export default class InstanceMesh {
  constructor() {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0
      },
    };
    this.num = 1000;
    this.obj;
  }
  createObj() {
    // Define Geometries
    const geometry = new THREE.InstancedBufferGeometry();
    const baseGeometry = new THREE.BoxBufferGeometry(10, 10, 10);

    // Copy attributes of the base Geometry to the instancing Geometry
    geometry.copy(baseGeometry);

    // Define attributes of the instancing geometry
    const iPositions = new THREE.InstancedBufferAttribute(new Float32Array(this.num * 3), 3);
    for ( var i = 0, ul = this.num; i < ul; i++ ) {
      iPositions.setXYZ(i, 0, 0, 0);
    }
    geometry.addAttribute('iPosition', iPositions);

    // Define Material
    const material = new THREE.RawShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: glslify('./glsl/instanceMesh.vs'),
      fragmentShader: glslify('./glsl/instanceMesh.fs'),
    });

    // Create Object3D
    this.obj = new THREE.Mesh(geometry, material);
    this.obj.frustumCulled = false;
  }
  render(time) {
    this.uniforms.time.value += time;
  }
}
