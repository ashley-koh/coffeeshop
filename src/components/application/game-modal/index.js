import React, { useState } from 'react';
import { Modal } from 'antd';
import '../index.css';

function GameModal(props) {



  return (
    <div>
      <Modal
        title={`Play against ${props.modalVisibility}!`}
        visible={props.modalVisibility}
        onOk={() => props.setModalVisibility(false)}
        onCancel={() => props.setModalVisibility(false)}
        width={700}
      >
        
      </Modal>
    </div>
  )
}

export default GameModal;