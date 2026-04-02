import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { homepageWeapons } from "@/features/homepage/data/homepage.fixtures";
import { HomepageView } from "@/features/homepage/components/homepage-view";

describe("HomepageView", () => {
  it("renders the count bar and empty comparison state", () => {
    render(<HomepageView weapons={homepageWeapons} />);

    expect(screen.getByTestId("count-bar")).toHaveTextContent(
      "3 Entries Catalogued",
    );
    expect(
      screen.getByText("Select two weapons to compare their stats"),
    ).toBeInTheDocument();
  });

  it("filters by name search only", async () => {
    const user = userEvent.setup();

    render(<HomepageView weapons={homepageWeapons} />);

    await user.type(
      screen.getByRole("textbox", { name: "Search weapons by name" }),
      "great",
    );

    expect(
      screen.getByRole("heading", { name: "Greatsword" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Battle Axe" }),
    ).not.toBeInTheDocument();
  });

  it("shows subclass buttons only after class selection", async () => {
    const user = userEvent.setup();

    render(<HomepageView weapons={homepageWeapons} />);

    expect(
      screen.queryByRole("button", { name: "All Knight" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Knight" }));

    expect(screen.getByRole("button", { name: "All Knight" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Officer" })).toBeInTheDocument();
  });

  it("sorts by speed with fastest first", async () => {
    const user = userEvent.setup();

    render(<HomepageView weapons={homepageWeapons} />);

    await user.selectOptions(screen.getByRole("combobox", { name: "Sort weapons" }), [
      "avgSpeed",
    ]);

    const headings = screen.getAllByRole("heading", { level: 2 });

    expect(headings.map((heading) => heading.textContent)).toEqual([
      "Mace",
      "Battle Axe",
      "Greatsword",
    ]);
  });

  it("supports comparison selection and clear", async () => {
    const user = userEvent.setup();

    render(<HomepageView weapons={homepageWeapons} />);

    await user.click(screen.getAllByRole("button", { name: "Set Left" })[0]);
    await user.click(screen.getAllByRole("button", { name: "Set Right" })[1]);

    expect(screen.getByText("Comparative Analysis")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /clear/i })).toHaveLength(2);

    await user.click(screen.getAllByRole("button", { name: /clear/i })[0]);

    expect(
      screen.getByText("Select a second weapon to see the comparison"),
    ).toBeInTheDocument();
  });

  it("applies prototype swap behavior when assigning the same weapon to the opposite slot", async () => {
    const user = userEvent.setup();

    render(<HomepageView weapons={homepageWeapons} />);

    await user.click(screen.getAllByRole("button", { name: "Set Left" })[0]);
    await user.click(screen.getAllByRole("button", { name: "Set Right" })[0]);

    expect(screen.getAllByRole("button", { name: "\u2714 Right" })).toHaveLength(1);
    expect(
      screen.queryByRole("button", { name: "\u2714 Left" }),
    ).not.toBeInTheDocument();
  });
});
