import React from 'react';
import VerticalTabs from 'uikit/VerticalTabs';
import { css } from 'uikit';
import Typography from 'uikit/Typography';
import DnaLoader from 'uikit/DnaLoader';
import { ClinicalSubmissionEntityFile } from '../types';
import FileRecordTable from './FileRecordTable';
import { Col } from 'react-grid-system';
import Button from 'uikit/Button';
import { useToaster } from 'global/hooks/toaster';

export default ({
  fileStates,
  loading,
}: {
  fileStates: Array<ClinicalSubmissionEntityFile>;
  loading: boolean;
}) => {
  const toaster = useToaster();
  const [selectedFile, setSelectedFile] = React.useState<ClinicalSubmissionEntityFile>(
    fileStates[0],
  );
  const onFileClick = fileState => e => {
    setSelectedFile(fileState);
  };
  const onClearClick = () => {
    toaster.addToast({
      title: 'DUMMY',
      content: "I'm just a dummy placeholder behaviour",
    });
  };
  return loading ? (
    <div
      css={css`
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <DnaLoader />
    </div>
  ) : (
    <div
      css={css`
        display: flex;
        height: 100%;
      `}
    >
      <div
        css={css`
          width: 170px;
          height: 100%;
          overflow: visible;
        `}
      >
        <VerticalTabs>
          {fileStates.map(fileState => (
            <VerticalTabs.Item
              key={fileState.id}
              active={selectedFile.id === fileState.id}
              onClick={onFileClick(fileState)}
            >
              {fileState.displayName}
              {fileState.status !== 'NONE' && fileState.status !== 'ERROR' && (
                <VerticalTabs.Tag variant={fileState.status}>
                  {fileState.recordsCount}
                </VerticalTabs.Tag>
              )}
              {fileState.status === 'ERROR' && (
                <VerticalTabs.Tag variant="ERROR">!</VerticalTabs.Tag>
              )}
            </VerticalTabs.Item>
          ))}
        </VerticalTabs>
      </div>
      <Col>
        <div
          css={css`
            padding: 8px;
            display: flex;
            justify-content: space-between;
          `}
        >
          <Typography
            variant="subtitle"
            color="primary"
            as="div"
            css={css`
              margin-left: 10px;
            `}
          >
            {selectedFile.displayName} File Preview
          </Typography>
          <Button variant="text" size="sm" onClick={onClearClick}>
            clear
          </Button>
        </div>
        <FileRecordTable
          file={selectedFile}
          submissionData={{
            fileName: 'some file',
            creator: 'Someone',
            createdAt: 'sometime',
          }}
        />
      </Col>
    </div>
  );
};
