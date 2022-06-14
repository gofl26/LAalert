import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    //모든 게시글을 조회
    getAllBoards(): Board[] {
        return this.boards;
    }

    //게시글 생성
    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }
        
        this.boards.push(board);
        return board;
    }

    //하나의 게시글 조회
    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);
        
        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
        
    }

    //하나의 게시글 삭제
    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    //게시글 수정
    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}
