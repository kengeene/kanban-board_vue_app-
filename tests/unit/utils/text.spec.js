import { copyToClipboard, generateProjectId } from "@/utils/text.js";

const writeText = jest.fn();

Object.assign(navigator, {
  clipboard: {
    writeText,
  },
});

describe("text utils", () => {
  it("Should be able to generate a project ID", () => {
    const projectId = generateProjectId();
    expect(projectId).toMatch(/^([A-Z]|[0-9]){3}-([A-Z]|[0-9]){3}$/g);
  });

  it("Should be able to copy text to clipboard", () => {
    copyToClipboard("this is copied");
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("this is copied");
  });
});
