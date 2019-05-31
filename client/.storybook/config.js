import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';

import ReactTable from 'react-table';
import React from 'react';
import ReactTableContainer from './ReactTableContainer';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    addonPanelInRight: true,
  },
});
addDecorator(withA11y);
addDecorator(
  (() => {
    const TableComponent = ({ propDefinitions }) => (
      <ReactTableContainer>
        <ReactTable
          minRows={0}
          showPagination={false}
          data={propDefinitions}
          columns={[
            { Header: 'property', accessor: 'property' },
            {
              Header: 'type',
              accessor: 'propType',
              Cell: ({ original }) =>
                !original.propType ? null : (
                  <React.Fragment>
                    {original.propType.name}
                    {original.propType.name === 'enum' && (
                      <div>
                        {Array.isArray(original.propType.value)
                          ? original.propType.value.map(({ value }, i) => (
                              <div key={i}>- {value}</div>
                            ))
                          : original.propType.value}{' '}
                      </div>
                    )}
                  </React.Fragment>
                ),
            },
            {
              Header: 'required',
              accessor: 'required',
              Cell: ({ original }) =>
                original.required ? (
                  <React.Fragment>{String(original.required)}</React.Fragment>
                ) : null,
            },
            {
              Header: 'description',
              accessor: 'description',
              style: { whiteSpace: 'unset' },
            },
            {
              Header: 'default value',
              accessor: 'defaultValue',
              style: { whiteSpace: 'unset' },
              Cell: ({ original }) => {
                return <React.Fragment>{String(original.defaultValue)}</React.Fragment>;
              },
            },
          ]}
        />
      </ReactTableContainer>
    );
    return withInfo({ inline: true, header: false, TableComponent });
  })(),
);
addDecorator(withKnobs);

configure(loadStories, module);
