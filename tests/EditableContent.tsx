import {expect} from "chai";
import EditableContent from "components/EditableContent";
import {mount} from "enzyme";
import * as React from "react";
import "./initTestDom";

const InputElement = () => <div />;
const StaticElement = () => <div />;

const noop = () => void 0;

describe("EditableContent", () => {
    it("shows static element when not editing", () => {
        const SUT: new (...args: any[]) => EditableContent<null> = EditableContent;
        const target = mount(
        <SUT
            inputComponentClass={InputElement}
            staticComponentClass={StaticElement}
            editing={false}
            toggleIsEditing={noop}
            value={null}
            updateValue={noop}
        />
        );
        expect(target.find(StaticElement).length).to.equal(1);
        expect(target.find(InputElement).length).to.equal(0);
    });
    it("shows input element when editing", () => {
        const SUT: new (...args: any[]) => EditableContent<null> = EditableContent;
        const target = mount(
        <SUT
            inputComponentClass={InputElement}
            staticComponentClass={StaticElement}
            editing={true}
            toggleIsEditing={noop}
            value={null}
            updateValue={noop}
        />
        );
        expect(target.find(InputElement).length).to.equal(1);
        expect(target.find(StaticElement).length).to.equal(0);
    });
});
