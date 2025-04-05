import {
  increment,
  selectCount,
} from "@src/redux/features/counter/counterSlide";
import { useAppDispatch, useAppSelector } from "@src/redux/hooks";
import { Button } from "./ui";

export default function Counter() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  return (
    <div>
      <div>Count: {count}</div>
      <Button onClick={() => dispatch(increment())}>Increment</Button>
    </div>
  );
}
