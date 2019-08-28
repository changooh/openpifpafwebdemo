/* global document */

import { Camera } from './camera';
import { Visualization } from './visualization';
import * as onnx from 'onnxjs';
import * as ndarray from 'ndarray';
import * as ops from 'ndarray-ops';


let backend_location = '';
if (document.location.search && document.location.search[0] === '?') {
    backend_location = document.location.search.substr(1);
}
if (!backend_location && document.location.hostname === 'vita-epfl.github.io') {
    backend_location = 'https://vitademo.epfl.ch';
}

const fpsSpan = <HTMLSpanElement>document.getElementById('fps');
let captureCounter = 0;
let fps = 0.0;
let lastProcessing: number = null;

const c = new Camera(document.getElementById('capture'));
const vis = new Visualization(document.getElementById('visualization'));
vis.markerSize = 10;


function drawFields(image: string, modelOutput) {
    const pifC: onnx.Tensor = modelOutput.get('pif_c');
    const pifR: onnx.Tensor = modelOutput.get('pif_r');
    const pafC: onnx.Tensor = modelOutput.get('paf_c');
    const pafR1: onnx.Tensor = modelOutput.get('paf_r1');
    const pafR2: onnx.Tensor = modelOutput.get('paf_r2');
    console.log({pifC});

    vis.drawFields(image, pifC, pifR, pafC, pafR1, pafR2);
}


function preProcess(ctx: CanvasRenderingContext2D): onnx.Tensor {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const { data, width, height } = imageData;
    const dataTensor = ndarray(data, [height, width, 4]);
    // const dataTensor = ndtranspose(dataTensorT);
    const dataProcessedTensor = ndarray(new Float32Array(width * height * 3), [1, 3, height, width]);
    ops.assign(dataProcessedTensor.pick(0, 0, null, null), dataTensor.pick(null, null, 0));
    ops.assign(dataProcessedTensor.pick(0, 1, null, null), dataTensor.pick(null, null, 1));
    ops.assign(dataProcessedTensor.pick(0, 2, null, null), dataTensor.pick(null, null, 2));
    ops.divseq(dataProcessedTensor, 255);
    ops.subseq(dataProcessedTensor.pick(0, 0, null, null), 0.485);
    ops.subseq(dataProcessedTensor.pick(0, 1, null, null), 0.456);
    ops.subseq(dataProcessedTensor.pick(0, 2, null, null), 0.406);
    ops.divseq(dataProcessedTensor.pick(0, 0, null, null), 0.229);
    ops.divseq(dataProcessedTensor.pick(0, 1, null, null), 0.224);
    ops.divseq(dataProcessedTensor.pick(0, 2, null, null), 0.225);
    const tensor = new onnx.Tensor(new Float32Array(3 * height * width), 'float32', [1, 3, height, width]);
    (tensor.data as Float32Array).set(dataProcessedTensor.data);
    console.log({width, height});
    return tensor;
}

const modelFile = 'static/openpifpaf-resnet50.onnx';
// const modelFile = 'static/openpifpaf-shufflenetv2x2.onnx';
// const modelFile = 'static/openpifpaf-mobilenetv2.onnx';
console.log({modelFile});

let model_loaded = false;
// create a session
const session = new onnx.InferenceSession({backendHint: 'webgl'});
// load the ONNX model file
session.loadModel(modelFile).then(() => { model_loaded = true; });


export async function newImageOnnx() {
    if (!model_loaded) {
        console.log('model not loaded yet');
        await new Promise(resolve => setTimeout(() => resolve(), 200));
        return;
    }

    // generate model input
    const data = c.imageData();
    const inferenceInputs = preProcess(c.captureContext);
    // execute the model
    console.log('about to run new session');
    const startSession = Date.now();
    const output = await session.run([inferenceInputs]);
    console.log({'nn done': Date.now() - startSession});
    if (lastProcessing != null) {
        const duration = Date.now() - lastProcessing;
        console.log({duration});
        fps = 0.5 * fps + 0.5 * (1000.0 / duration);
        fpsSpan.textContent = `${fps.toFixed(1)}`;
    }
    lastProcessing = Date.now();

    // process output
    drawFields(data.image, output);
}


async function loop_forever() {
    while (true) {
        await newImageOnnx();
        await new Promise(resolve => requestAnimationFrame(() => resolve()));
    }
}
loop_forever();
