import React from "react";
import { Button, FormControl, Input, useFormControlContext } from "@mui/base";
import clsx from "clsx";

function NewBookmarkForm() {
    const [bookmark, setBookmark] = React.useState({
        title: "",
        url: "",
        description: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!bookmark.title || !bookmark.url) {
            return;
        }
        console.log(bookmark);
    }

    return (
        <form action="" className="flex flex-col gap-3">
            <FormControl
                defaultValue=""
                className="flex items-center justify-between gap-2"
                required
            >
                <Label>Title</Label>
                <Input
                    slotProps={{
                        input: {
                            className:
                                "w-[100%] text-sm leading-5 px-3 py-2 rounded shadow-md shadow-rose-100 dark:shadow-rose-900 focus:shadow-outline-rose dark:focus:shadow-outline-rose focus:shadow-lg border border-solid border-rose-300 hover:border-rose-500 dark:hover:border-rose-500 focus:border-rose-500 dark:focus:border-rose-500 dark:border-rose-600 bg-white dark:bg-rose-900 text-black-900 dark:text-black-300 focus-visible:outline-0",
                        },
                        root: {
                            className: "max-w-[250px] w-[100%]",
                        },
                    }}
                    onChange={(e) =>
                        setBookmark({ ...bookmark, title: e.target.value })
                    }
                />
            </FormControl>
            <FormControl
                defaultValue=""
                className="flex items-center justify-between gap-2"
                required
            >
                <Label>URL</Label>
                <Input
                    slotProps={{
                        input: {
                            className:
                                "w-[100%] text-sm leading-5 px-3 py-2 rounded shadow-md shadow-rose-100 dark:shadow-rose-900 focus:shadow-outline-rose dark:focus:shadow-outline-rose focus:shadow-lg border border-solid border-rose-300 hover:border-rose-500 dark:hover:border-rose-500 focus:border-rose-500 dark:focus:border-rose-500 dark:border-rose-600 bg-white dark:bg-rose-900 text-black-900 dark:text-black-300 focus-visible:outline-0",
                        },
                        root: {
                            className: "max-w-[250px] w-[100%]",
                        },
                    }}
                    type="url"
                    onChange={(e) =>
                        setBookmark({ ...bookmark, url: e.target.value })
                    }
                />
            </FormControl>
            <FormControl
                defaultValue=""
                className="flex items-center justify-between gap-2"
            >
                <Label>Description</Label>
                <Input
                    slotProps={{
                        input: {
                            className:
                                "w-[100%] text-sm leading-5 px-3 py-2 rounded shadow-md shadow-rose-100 dark:shadow-rose-900 focus:shadow-outline-rose dark:focus:shadow-outline-rose focus:shadow-lg border border-solid border-rose-300 hover:border-rose-500 dark:hover:border-rose-500 focus:border-rose-500 dark:focus:border-rose-500 dark:border-rose-600 bg-white dark:bg-rose-900 text-black-900 dark:text-black-300 focus-visible:outline-0",
                        },
                        root: {
                            className: "max-w-[250px] w-[100%]",
                        },
                    }}
                    type="text"
                    onChange={(e) =>
                        setBookmark({
                            ...bookmark,
                            description: e.target.value,
                        })
                    }
                />
            </FormControl>
            <Button
                onSubmit={handleSubmit}
                type="submit"
                className="mx-auto bg-rose-400 hover:bg-rose-500 px-3 py-1 rounded text-white"
            >
                Add Bookmark
            </Button>
        </form>
    );
}

const Label = React.forwardRef<
    HTMLParagraphElement,
    { className?: string; children?: React.ReactNode }
>(({ className: classNameProp, children }, ref) => {
    const formControlContext = useFormControlContext();
    const [dirty, setDirty] = React.useState(false);

    React.useEffect(() => {
        if (formControlContext?.filled) {
            setDirty(true);
        }
    }, [formControlContext]);

    if (formControlContext === undefined) {
        return (
            <p className={clsx("text-sm mb-1", classNameProp)}>{children}</p>
        );
    }

    const { error, required, filled } = formControlContext;
    const showRequiredError = dirty && required && !filled;

    return (
        <p
            ref={ref}
            className={clsx(
                "text-sm mb-1",
                classNameProp,
                error || showRequiredError
                    ? "invalid text-red-500 font-bold"
                    : ""
            )}
        >
            {children}
            {required ? " *" : ""}
        </p>
    );
});

export default NewBookmarkForm;
