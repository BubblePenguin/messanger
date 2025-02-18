"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import Select from "@/app/components/inputs/Select";
import Modal from "@/app/components/Modal";
import { Label } from "@headlessui/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  onClose: () => void;
  isOpen: boolean;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  onClose,
  isOpen,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", { ...data, isGroup: true })
      .then(() => {
        router.refresh();
        router.push("/conversations");
      })
      .catch(() => toast.error("GroupModalError"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div
            className="
            border-b
            border-gray-900/10
            pb-12"
          >
            <h2 className="text-base font-semibold text-gray-900 leading-7">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a chat with more than 2 people
            </p>
            <div
              className="
              mt-10
              flex
              flex-col
              gap-y-8"
            >
              <Input
                register={register}
                label="name"
                id="name"
                disabled={isLoading}
                required
                errors={errors}
              />
              <Select
                label="Members"
                disabled={isLoading}
                options={users.map((u) => {
                  return {
                    value: u.id,
                    label: u.name,
                  };
                })}
                onChange={(value) =>
                  setValue("members", value, { shouldValidate: true })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="flex mt-6 justify-end gap-x-6 items-center">
          <Button disabled={isLoading} secondary onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
