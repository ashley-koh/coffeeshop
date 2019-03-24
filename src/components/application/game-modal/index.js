import React, { useState } from 'react';
import { Modal } from 'antd';
import '../index.css';
import Game from '../../games/TTT.js'

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
      <Game></Game>
      </Modal>
    </div>
  )
}

export default GameModal;