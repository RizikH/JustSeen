export default function formatRuntime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else {
        return `${minutes}m`;
    }
}