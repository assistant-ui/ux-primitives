import { ActionBarPrimitive } from "@assistant-ui/react";
import {
  Pencil1Icon,
  ReloadIcon,
  SpeakerLoudIcon,
} from "@radix-ui/react-icons";
import {
  DEFAULT_BUTTON_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
} from "./defaults";

type ActionButtonProps = {
  buttonClassName?: string;
  iconClassName?: string;
};

export function ReloadAction({
  buttonClassName,
  iconClassName,
}: ActionButtonProps) {
  return (
    <ActionBarPrimitive.Reload
      className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
    >
      <ReloadIcon className={iconClassName ?? DEFAULT_ICON_CLASSNAME} />
    </ActionBarPrimitive.Reload>
  );
}

export function EditAction({
  buttonClassName,
  iconClassName,
}: ActionButtonProps) {
  return (
    <ActionBarPrimitive.Edit
      className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
    >
      <Pencil1Icon className={iconClassName ?? DEFAULT_ICON_CLASSNAME} />
    </ActionBarPrimitive.Edit>
  );
}

export function SpeakAction({
  buttonClassName,
  iconClassName,
}: ActionButtonProps) {
  return (
    <ActionBarPrimitive.Speak
      className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
    >
      <SpeakerLoudIcon className={iconClassName ?? DEFAULT_ICON_CLASSNAME} />
    </ActionBarPrimitive.Speak>
  );
}
