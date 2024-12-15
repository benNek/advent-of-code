export default async function getLines() {
  return (await Bun.file(process.env.FILE_PATH + "/input.txt").text()).split(
    "\n"
  );
}