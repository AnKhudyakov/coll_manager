import { styled } from "@mui/material";

const DarkEditorWrapper = styled("div")`
  .w-md-editor {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.text.secondary};
    background-color: ${({ theme }) => theme.palette.background.main};
    color: ${({ theme }) => theme.palette.text.primary};
  }
  .w-md-editor-toolbar {
    border-bottom: 1px solid ${({ theme }) => theme.palette.text.secondary};
    background-color: ${({ theme }) => theme.palette.background.main};
    color: ${({ theme }) => theme.palette.text.primary};
    li {
      button {
        color: ${({ theme }) => theme.palette.text.primary};
      }
    }
  }
  .w-md-editor-header {
    background-color: ${({ theme }) => theme.palette.background.main};
    color: ${({ theme }) => theme.palette.text.primary};
  }
  .w-md-editor-preview {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.text.secondary};
    background-color: ${({ theme }) => theme.palette.background.main};
    color: ${({ theme }) => theme.palette.text.primary};
  }
  .wmde-markdown {
    background-color: ${({ theme }) => theme.palette.background.light};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export default DarkEditorWrapper;
