import React, { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Device } from '../../../types';
import NiceModal, { useModal } from '@ebay/nice-modal-react';

import Modal, { ModalBody, ModalFooter, ModalHeader } from '../Modal';

type DeviceRemovalButtonProps = {
    device: Device;
    removeDevice(dev: string, force: boolean, block: boolean): Promise<void>;
};

export const RemoveDeviceModal = NiceModal.create((props: DeviceRemovalButtonProps): JSX.Element => {
    const modal = useModal();
    const { t } = useTranslation(['zigbee', 'common']);
    const { device, removeDevice } = props;
    const [removeParams, setRemoveParams] = useState({ block: false, force: false });

    const checks = [
        { label: t('force_remove'), name: 'force', value: removeParams.force },
        { label: t('block_join'), name: 'block', value: removeParams.block },
    ];
    const onDeviceRemovalParamChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { checked, name } = e.target;
        setRemoveParams({ ...removeParams, ...{ [name]: checked } });
    };
    const onRemoveClick = () => {
        removeDevice(device.friendly_name, removeParams.force, removeParams.block);
        modal.remove();
    };

    return (
        <Modal isOpen={modal.visible}>
            <ModalHeader>
                <h3>{t('remove_device')}</h3>
                <small>{device.friendly_name}</small>
            </ModalHeader>
            <ModalBody>
                {checks.map((check) => {
                    const id = `${check.name}${device.ieee_address}`;
                    return (
                        <div key={check.name} className="form-check form-switch">
                            <input
                                className="form-check-input"
                                name={check.name}
                                checked={check.value}
                                type="checkbox"
                                id={id}
                                onChange={onDeviceRemovalParamChange}
                            />
                            <label className="form-check-label" htmlFor={id}>
                                {check.label}
                            </label>
                        </div>
                    );
                })}
            </ModalBody>
            <ModalFooter>
                <button type="button" className="btn btn-secondary" onClick={modal.remove}>
                    {t('common:close')}
                </button>
                <button type="button" className="btn btn-danger" onClick={onRemoveClick}>
                    {t('common:delete')}
                </button>
            </ModalFooter>
        </Modal>
    );
});
