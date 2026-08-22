import { Stack } from "./Stack";
import { Statement } from "./Statement";
import { Deliverables } from "./Deliverables";
import { Stories } from "./Stories";

export function Work() {
  return (
    <section id="work" className="relative bg-paper">
      <Stack />
      <Statement />
      <Deliverables />
      <Stories />
    </section>
  );
}
