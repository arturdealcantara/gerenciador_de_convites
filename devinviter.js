/* Desenvolvido por GM#1330
* Intenções: Minha itenção é fazer com que os desenvolvedores de bots consigam gerenciar seus bots melhor.
* O que faz: Esse comando consegue buscar todos os convites de usuários do servidor mencionado por ID.
* Para: Numa situação ipotética, o desenvolvedor precisaria entrar em contato direto com usuários ou ter a confirmação de algo, sem necessidade de criar um convite.
*/

const Discord = require("discord.js")
const { owners_id } = require("./../../config")

exports.run = async (client, message, args, prefix, idioma) => {

    owners_id.forEach(async function (owner) {
        if (message.author.id !== owner) return

        let guild = client.guilds.get(args[0])

        if ((!guild)) return message.reply(idioma("emb_invite_servidores_not"))

        let invi,
            invite = await guild.fetchInvites()
                .then(async (invites) => [invites])
                .catch(console.error),

            embed4 = new Discord.RichEmbed()
                .setThumbnail(guild.iconURL)
                .setColor(000000)
                .setTitle(idioma("emb_invite_servidores $[1]", guild.name))
                .setTimestamp()
                .setFooter(`${idioma("footer_global")} ${message.author.tag} | ${client.user.username} v${client.version}`, message.author.displayAvatarURL)

        for (let i = 0; i < invite.length; i++) {
            const inv = invite[i];
            inv.forEach(invite => {
                invi = {
                    servidor: invite.guild.name,
                    id_servidor: invite.guild.id,
                    criador: invite.inviter.username,
                    id: invite.inviter.id,
                    criado_em: invite.createdTimestamp,
                    temporario: invite.temporary,
                    max_usos: invite.maxAge,
                    usos: invite.uses,
                    code: invite.code
                }

                embed4.addField(`**` + idioma("emb_invite_servidores_user $[1]", invi.criador) + `**`, `**Code:** [${invi.code}](https://discord.gg/${invi.code})\n${idioma("temp $[1]", invi.temporario === false ? idioma("nao") : idioma("sim"))}\n${idioma("usos $[1]", invi.usos)}`, true)

            })
        }

        message.channel.send(embed4)
    })
}
