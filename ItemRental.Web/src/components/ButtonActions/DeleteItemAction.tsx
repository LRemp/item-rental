import api from "@/api";
import useApiResult from "@/hooks/useApiResult";
import { Success } from "@/utils/Notifications";
import { Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteItemAction: React.FC<ItemButtonActionProps> = ({ id }) => {
    const { loading, request } = useApiResult(() => api.Item.deleteItem(id));
    const navigate = useNavigate();

    const openModal = () =>
        modals.openConfirmModal({
        title: 'Delete this item?',
        centered: true,
        children: (
            <Text size="sm">
            Are you sure you want to delete this item? This action is irreversible and the data about
            the item will be lost.
            </Text>
        ),
        labels: { confirm: 'Delete item', cancel: 'Cancel' },
        confirmProps: { color: 'red' },
        onCancel: () => console.log('Cancel'),
        onConfirm: async () => {
            await request();
            notifications.show(Success({
            title: 'Success',
            message: 'The item was successfuly deleted!',
            }));
            navigate('/dashboard/inventory');
        },
        });

    return (
        <>
            <Button color="red" onClick={openModal}>
                Delete
                <IconX size={18} />
            </Button>
        </>
    )
}

export default DeleteItemAction;