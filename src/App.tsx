import { Button } from "./components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./components/ui/select";

function App() {
  return (
    <>
      <div>
        <Button>Click me</Button>

        <select name="" id="">
          <option value="">item 1</option>
          <option value="">item 2</option>
          <option value="">item 3</option>
          <option value="">item 4</option>
        </select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default App;
