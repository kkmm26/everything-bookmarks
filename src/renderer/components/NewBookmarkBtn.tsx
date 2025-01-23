import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { Button } from "@mui/base";
import { AddLinkSharp, CloseSharp } from "@mui/icons-material";
import { grey, pink } from "@mui/material/colors";
import NewBookmarkForm from "./NewBookmarkForm";

export default function NewBookmarkBtn({ lastClickedFolder }: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (event: React.MouseEvent, reason?: string) => {
        if (reason === "escapeKeyDown" || reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    return (
        <div className="self-center">
            <Button
                onClick={handleOpen}
                className="group hover:bg-pink-100 rounded px-2"
            >
                <AddLinkSharp sx={{ color: pink[500], fontSize: "1.6rem" }} />
            </Button>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}
            >
                <ModalContent sx={{ width: 400 }}>
                    <Button
                        onClick={handleClose}
                        className="absolute right-[2px] top-[2px]"
                    >
                        <CloseSharp />
                    </Button>
                    <NewBookmarkForm lastClickedFolder={lastClickedFolder} />
                </ModalContent>
            </Modal>
        </div>
    );
}

const Backdrop = React.forwardRef((props: any, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ "base-Backdrop-open": open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
    ({ theme }) => css`
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: 500;
        text-align: start;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border-radius: 8px;
        border: 1px solid
            ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        box-shadow: 0 4px 12px
            ${theme.palette.mode === "dark"
                ? "rgb(0 0 0 / 0.5)"
                : "rgb(0 0 0 / 0.2)"};
        padding: 24px;
        color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

        & .modal-title {
            margin: 0;
            line-height: 1.5rem;
            margin-bottom: 8px;
        }

        & .modal-description {
            margin: 0;
            line-height: 1.5rem;
            font-weight: 400;
            color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
            margin-bottom: 4px;
        }
    `
);
