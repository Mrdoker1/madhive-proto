import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { motion } from 'framer-motion';

interface InfoNotificationProps {
  message: string;
  onDismiss?: () => void;
}

const InfoNotification = ({ message, onDismiss }: InfoNotificationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <Alert
        icon={<IconInfoCircle size={16} />}
        color="blue"
        variant="light"
        style={{
          marginBottom: '24px',
          backgroundColor: '#E4EDFF',
          border: '1px solid #98BBFF',
          minHeight: 'auto',
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
        }}
        styles={{
          message: {
            fontSize: '14px',
          },
          icon: {
            marginRight: '8px',
            color: '#0054FF'
          }
        }}
        withCloseButton={false}
      >
        {message}
      </Alert>
    </motion.div>
  );
};

export default InfoNotification;

