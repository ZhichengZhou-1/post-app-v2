import {
    PostCreateItemBody,
    PostDeleteItemQuery,
    PostGetItemQuery,
    PostGetItemResponse,
    PostGetListResponse,
    PostUpdateItemBody
} from "../interface/post.interface";
import { ResponseData, SuccessResponse } from "../utils/response.util";
import {
    ExpressRouter,
    Get,
    asRouter,
    Post,
    Delete
} from "../utils/routes.util";
import { Request, Response } from "express";
import * as Log from "../utils/log.util";
import PostService from "../service/post.service";

@ExpressRouter("/post")
class Blog {
    /**
     * Get a single Post
     */
    @Get("/get")
    async getSinglePost(
        req: Request<{}, {}, {}, PostGetItemQuery>,
        res: Response<ResponseData<PostGetItemResponse>>
    ): Promise<void> {
        const TAG = "POST_GET_ITEM";
        Log.info(TAG, "---", req.query.primaryKey);

        const data = await PostService.getItem(req.query.primaryKey);
        res.send(SuccessResponse<PostGetItemResponse>(data));
    }

    /**
     * Get all posts
     */
    @Get("/list")
    async getPostList(
        req: Request<{}, {}, {}, {}>,
        res: Response<ResponseData<PostGetListResponse>>
    ): Promise<void> {
        const TAG = "POST_GET_LIST";
        Log.info(TAG);

        const data = await PostService.getList();
        Log.info("data: ", data);
        res.send(SuccessResponse<PostGetListResponse>(data));
    }

    /**
     *
     * create a single post
     */
    @Post("/create")
    async createSinglePost(
        req: Request<{}, {}, PostCreateItemBody, {}>,
        res: Response
    ): Promise<void> {
        const TAG = "POST_CREATE_ITEM";
        Log.info(TAG, "---", req.body);

        await PostService.createItem({
            postId: { S: req.body.postId },
            content: { S: req.body.content ? req.body.content : "" },
            title: { S: req.body.title },
            author: { S: req.body.author },
            lastModified: { S: req.body.lastModified }
        });
        res.send(SuccessResponse());
    }

    /**
     * delete a single post
     */
    @Delete("/delete")
    async deleteSinglePost(
        req: Request<{}, {}, {}, PostDeleteItemQuery>,
        res: Response
    ): Promise<void> {
        const TAG = "POST_DELETE_ITEM";
        Log.info(TAG, "---", req.query.primaryKey);

        await PostService.deleteItem(req.query.primaryKey);
        res.send(SuccessResponse());
    }

    /**
     * update a single post
     */
    @Post("/update")
    async updateSinglePost(
        req: Request<{}, {}, PostUpdateItemBody, {}>,
        res: Response
    ): Promise<void> {
        const TAG = "POST_UPDATE_ITEM";
        Log.info(TAG, "---", req.body.primaryKey);

        await PostService.updateItem(req.body.primaryKey, req.body.attributes);
        res.send(SuccessResponse());
    }
}

export default asRouter(Blog);
