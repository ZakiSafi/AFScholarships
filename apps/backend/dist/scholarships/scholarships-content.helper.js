"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scholarshipDetailInclude = void 0;
exports.buildNestedCreate = buildNestedCreate;
exports.replaceNestedContent = replaceNestedContent;
exports.scholarshipDetailInclude = {
    steps: { orderBy: { orderIndex: 'asc' } },
    requirements: { orderBy: { orderIndex: 'asc' } },
    benefits: { orderBy: { orderIndex: 'asc' } },
    faqs: { orderBy: { orderIndex: 'asc' } },
    sources: true,
    tags: { include: { tag: true } },
    verificationReviews: {
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
            reviewer: { select: { id: true, name: true, email: true } },
        },
    },
};
function buildNestedCreate(content) {
    if (!content) {
        return {};
    }
    return {
        steps: content.steps
            ? {
                create: content.steps.map((step) => ({
                    orderIndex: step.orderIndex,
                    title: step.title,
                    description: step.description,
                    isRequired: step.isRequired ?? true,
                })),
            }
            : undefined,
        requirements: content.requirements
            ? {
                create: content.requirements.map((item) => ({
                    orderIndex: item.orderIndex,
                    label: item.label,
                    description: item.description,
                    isMandatory: item.isMandatory ?? true,
                })),
            }
            : undefined,
        benefits: content.benefits
            ? {
                create: content.benefits.map((item) => ({
                    orderIndex: item.orderIndex,
                    title: item.title,
                    description: item.description,
                })),
            }
            : undefined,
        faqs: content.faqs
            ? {
                create: content.faqs.map((item) => ({
                    orderIndex: item.orderIndex,
                    question: item.question,
                    answer: item.answer,
                })),
            }
            : undefined,
        sources: content.sources
            ? {
                create: content.sources.map((item) => ({
                    url: item.url,
                    label: item.label,
                })),
            }
            : undefined,
        tags: content.tags
            ? {
                create: content.tags.map((tag) => ({
                    tag: {
                        connectOrCreate: {
                            where: { slug: tag.slug },
                            create: { slug: tag.slug, name: tag.name },
                        },
                    },
                })),
            }
            : undefined,
    };
}
async function replaceNestedContent(tx, scholarshipId, content) {
    if (content.steps !== undefined) {
        await tx.applicationStep.deleteMany({ where: { scholarshipId } });
        if (content.steps.length) {
            await tx.applicationStep.createMany({
                data: content.steps.map((step) => ({
                    scholarshipId,
                    orderIndex: step.orderIndex,
                    title: step.title,
                    description: step.description,
                    isRequired: step.isRequired ?? true,
                })),
            });
        }
    }
    if (content.requirements !== undefined) {
        await tx.scholarshipRequirement.deleteMany({ where: { scholarshipId } });
        if (content.requirements.length) {
            await tx.scholarshipRequirement.createMany({
                data: content.requirements.map((item) => ({
                    scholarshipId,
                    orderIndex: item.orderIndex,
                    label: item.label,
                    description: item.description,
                    isMandatory: item.isMandatory ?? true,
                })),
            });
        }
    }
    if (content.benefits !== undefined) {
        await tx.scholarshipBenefit.deleteMany({ where: { scholarshipId } });
        if (content.benefits.length) {
            await tx.scholarshipBenefit.createMany({
                data: content.benefits.map((item) => ({
                    scholarshipId,
                    orderIndex: item.orderIndex,
                    title: item.title,
                    description: item.description,
                })),
            });
        }
    }
    if (content.faqs !== undefined) {
        await tx.scholarshipFaq.deleteMany({ where: { scholarshipId } });
        if (content.faqs.length) {
            await tx.scholarshipFaq.createMany({
                data: content.faqs.map((item) => ({
                    scholarshipId,
                    orderIndex: item.orderIndex,
                    question: item.question,
                    answer: item.answer,
                })),
            });
        }
    }
    if (content.sources !== undefined) {
        await tx.scholarshipSource.deleteMany({ where: { scholarshipId } });
        if (content.sources.length) {
            await tx.scholarshipSource.createMany({
                data: content.sources.map((item) => ({
                    scholarshipId,
                    url: item.url,
                    label: item.label,
                })),
            });
        }
    }
    if (content.tags !== undefined) {
        await tx.scholarshipToTag.deleteMany({ where: { scholarshipId } });
        for (const tag of content.tags) {
            const record = await tx.scholarshipTag.upsert({
                where: { slug: tag.slug },
                create: { slug: tag.slug, name: tag.name },
                update: { name: tag.name },
            });
            await tx.scholarshipToTag.create({
                data: { scholarshipId, tagId: record.id },
            });
        }
    }
}
//# sourceMappingURL=scholarships-content.helper.js.map