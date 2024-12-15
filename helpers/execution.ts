export function isVisualMode() {
    // controlled by -v flag
    return process.env.VISUAL_MODE;
}