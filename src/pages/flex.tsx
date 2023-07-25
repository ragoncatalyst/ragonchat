export default function Flex() {
  return (
    <div className="flex w-full items-center h-screen bg-red-300 p-2 gap-2">
      <div className="left-pane w-1/2 h-full bg-blue-500 rounded-md shadow">
        Left
      </div>
      <div className="right-pane w-1/2 h-full bg-yellow-600 rounded-md shadow">
        Right
      </div>
    </div>
  );
}
