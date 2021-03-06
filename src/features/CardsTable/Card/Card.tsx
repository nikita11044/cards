import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {deleteCardTC} from "./cards-reducer";
import {makeStyles} from "@material-ui/core";
import {UpdateCardForm} from "../UpdateCardForm/UpdateCardForm";
import Modal from "@material-ui/core/Modal";

type CardPropsType = {
    answer: string
    answerImg?: string
    question: string
    questionImg?: string
    grade: number
    rating: number
    cardsPack_id: string
    user_id: string
    _id: string
}


export const Card: React.FC<CardPropsType> = ({
                                                  answer,
                                                  answerImg,
                                                  question,
                                                  questionImg,
                                                  grade,
                                                  rating,
                                                  _id,
                                                  cardsPack_id
                                              }) => {

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    function getModalStyle() {
        const top = 50;
        const left = 50;

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState<boolean>(false)
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <UpdateCardForm _id={_id} cardsPack_id={cardsPack_id} modalCloseHandler={handleClose}/>
        </div>
    );

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(deleteCardTC(_id, cardsPack_id))
    }

    return <>
        <tr>
            <td>{question}</td>
            <td>{questionImg && <img style={{width: '200', height: '100px'}} src={questionImg}/> || 'none'}</td>
            <td>{answer}</td>
            <td>{answerImg && <img style={{width: '200', height: '100px'}} src={answerImg}/> || 'none'}</td>
            <td>{grade}</td>
            <td>{rating}</td>
            <td>
                <button type="button" onClick={deleteHandler}>Delete</button>
            </td>
            <td>
                <button type="button" onClick={handleOpen}>Update</button>
            </td>
        </tr>
        <Modal open={open} onClose={handleClose}>
            {body}
        </Modal>
    </>
}