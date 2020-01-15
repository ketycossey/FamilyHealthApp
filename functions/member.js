async function getMember(member_id) {
    const member = await models.Family_member.findOne({
        where: {
            id: member_id
        },
        include: [
            {
                model: models.TestLab,
                as: 'TestLab'
            },
            {
                model: models.Insurance,
                as: 'Insurance'
            },
            {
                model: models.Medication,
                as: 'Medication'
            },
            {
                model: models.CareProviders,
                as: 'Care_provider'
            }
        ]
    })
    return member
}

module.exports = getMember