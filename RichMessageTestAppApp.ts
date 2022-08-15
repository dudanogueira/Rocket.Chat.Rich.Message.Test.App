import {
    IAppAccessors,
    IConfigurationExtend,
    IHttp,
    ILogger,
    IModify,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IMessageAttachment } from '@rocket.chat/apps-engine/definition/messages';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';

export class RichMessageCommand implements ISlashCommand {
    public command = 'richmessage'; // [1]
    public i18nParamsExample = 'RichMessage_Params';
    public i18nDescription = 'RichMessage_Description';
    public providesPreview = false;

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp): Promise<void> {
        const [subcommand, ...params] = context.getArguments();
        // room infos
        const user = context.getSender()
        const room = context.getRoom()
        const block = modify.getCreator().getBlockBuilder();
        if (!subcommand) {
        } else {
            switch (subcommand) {
                case 'image':

                    const imageAttachment = {
                        imageUrl: "https://picsum.photos/200/300",
                    } as IMessageAttachment;
                    console.log("here: ")
                    const image_with_attachment = modify
                        .getCreator()
                        .startMessage()
                        .setRoom(room)
                        .setText("test").setAttachments([{imageUrl: "https://picsum.photos/200/300"}])
                    await modify.getCreator().finish(image_with_attachment);
            }
        }
    }
}
export class RichMessageTestAppApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async extendConfiguration(configuration: IConfigurationExtend) {
        configuration.slashCommands.provideSlashCommand(new RichMessageCommand());
    }
}
