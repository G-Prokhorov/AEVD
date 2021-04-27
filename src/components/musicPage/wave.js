import WaveSurfer from 'wavesurfer.js';

export default function wave(id, audio) {
    let waveform = WaveSurfer.create({
        barWidth: 5,
        cursorWidth: 1,
        container: id,
        backend: 'WebAudio',
        height: 100,
        progressColor: '#7e3fcb',
        responsive: true,
        waveColor: '#7e3fcb',
        cursorColor: 'transparent',
    });
    waveform.load(audio);
    return waveform
}