import { render, screen, within } from '@testing-library/react';
import Resource from "@/components/Resource";

import { renderHook, act, cleanup } from '@testing-library/react'
import * as n3 from "n3";

jest.mock('swr');

var mockParse = jest.fn();
var mockGetSubjects = jest.fn();
var mockGetObjects = jest.fn();

jest.mock('n3', () => ({
  Parser: jest.fn(),
  Store: jest.fn(),
}));

var EditableCard = jest.fn((props) => (
  <div data-testid={props.dataTestid}>{props.children}</div>
));
jest.mock('@/components/EditableCard', () => (props: any) => EditableCard(props));

describe('Resource', () => {
  beforeEach(() => {
    const parserSpy = jest.spyOn(n3, 'Parser');
    parserSpy.mockImplementation(() => ({ parse: mockParse }))

    const storeSpy = jest.spyOn(n3, 'Store');
    storeSpy.mockImplementation(() => ({
      getSubjects: mockGetSubjects,
      getObjects: mockGetObjects,
    } as any))
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    cleanup();
  });

  it('logs a warning if the resource type is unknown', () => {
    const consoleSpy = jest.spyOn(global.console, 'log');
    mockGetSubjects.mockReturnValue([{ id: 'abc' }]);
    mockGetObjects.mockReturnValue([{ value: 'https://antwika.com/vocab/solidmemo/0.1/Null' }]);
    render(
      <Resource dataTestid='test-resource' iri='iri' raw='raw' />
    );
    
    const resource = screen.queryByTestId('test-resource');
    expect(resource).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(`Could not render resource, reason: Unknown type "https://antwika.com/vocab/solidmemo/0.1/Null"`);
  });

  it('can render a Card resource', () => {
    mockGetSubjects.mockReturnValue([{ id: 'abc' }]);
    mockGetObjects.mockReturnValue([{ value: 'https://antwika.com/vocab/solidmemo/0.1/Card' }]);
    render(
      <Resource dataTestid='test-resource' iri='iri' raw='raw' />
    );
    
    const resource = screen.queryByTestId('test-resource');
    expect(resource).toBeInTheDocument();
  });
});
