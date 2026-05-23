-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AuthProviderType" AS ENUM ('GOOGLE', 'EMAIL');

-- CreateEnum
CREATE TYPE "DegreeLevel" AS ENUM ('BACHELOR', 'MASTER', 'PHD', 'SHORT_COURSE');

-- CreateEnum
CREATE TYPE "FundingType" AS ENUM ('FULL', 'PARTIAL', 'TUITION_ONLY', 'STIPEND_ONLY');

-- CreateEnum
CREATE TYPE "ScholarshipStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('VERIFIED', 'UNVERIFIED', 'FLAGGED_STALE');

-- CreateEnum
CREATE TYPE "ReminderChannel" AS ENUM ('EMAIL');

-- CreateEnum
CREATE TYPE "ReminderStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('REMINDER', 'DIGEST', 'PASSWORD_RESET', 'APPLICATION_UPDATE');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('OPEN', 'RESOLVED', 'DISMISSED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "emailVerifiedAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthProviderAccount" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" "AuthProviderType" NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthProviderAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessionToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "userId" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "city" TEXT,
    "province" TEXT,
    "country" TEXT,
    "educationLevel" TEXT,
    "fieldOfStudy" TEXT,
    "targetDegree" "DegreeLevel",
    "targetCountry" TEXT,
    "interests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "linkedinUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "userId" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'en',
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "emailDigestEnabled" BOOLEAN NOT NULL DEFAULT true,
    "marketingOptIn" BOOLEAN NOT NULL DEFAULT false,
    "preferredCountries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "preferredDegreeLevels" "DegreeLevel"[] DEFAULT ARRAY[]::"DegreeLevel"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "hostCountry" TEXT NOT NULL,
    "degreeLevel" "DegreeLevel" NOT NULL,
    "fundingType" "FundingType" NOT NULL,
    "languageRequirement" TEXT,
    "fieldOfStudy" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "eligibleCountries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "applicationUrl" TEXT,
    "isPartnerApplication" BOOLEAN NOT NULL DEFAULT false,
    "status" "ScholarshipStatus" NOT NULL DEFAULT 'DRAFT',
    "startsAt" TIMESTAMP(3),
    "deadlineAt" TIMESTAMP(3) NOT NULL,
    "deadlineTimezone" TEXT NOT NULL DEFAULT 'UTC',
    "verificationStatus" "VerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "verifiedAt" TIMESTAMP(3),
    "lastReviewedAt" TIMESTAMP(3),
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipRequirement" (
    "id" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "isMandatory" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipRequirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipBenefit" (
    "id" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipBenefit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationStep" (
    "id" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipFaq" (
    "id" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipFaq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipSource" (
    "id" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "lastCheckedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScholarshipTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipToTag" (
    "scholarshipId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ScholarshipToTag_pkey" PRIMARY KEY ("scholarshipId","tagId")
);

-- CreateTable
CREATE TABLE "SavedScholarship" (
    "userId" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedScholarship_pkey" PRIMARY KEY ("userId","scholarshipId")
);

-- CreateTable
CREATE TABLE "UserReminder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "reminderAt" TIMESTAMP(3) NOT NULL,
    "channel" "ReminderChannel" NOT NULL DEFAULT 'EMAIL',
    "status" "ReminderStatus" NOT NULL DEFAULT 'PENDING',
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserReminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "type" "NotificationType" NOT NULL,
    "channel" "ReminderChannel" NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "sentAt" TIMESTAMP(3),
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotificationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerApplication" (
    "id" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "reviewedById" TEXT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "country" TEXT,
    "educationLevel" TEXT,
    "statement" TEXT NOT NULL,
    "docsUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "ApplicationStatus" NOT NULL DEFAULT 'SUBMITTED',
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PartnerApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerApplicationAnswer" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "questionKey" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "PartnerApplicationAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerApplicationStatusLog" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "fromStatus" "ApplicationStatus",
    "toStatus" "ApplicationStatus" NOT NULL,
    "note" TEXT,
    "changedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerApplicationStatusLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationAttachment" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "mimeType" TEXT,
    "sizeBytes" INTEGER,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationAttachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingReport" (
    "id" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "userId" TEXT,
    "reviewedById" TEXT,
    "reason" TEXT NOT NULL,
    "details" TEXT,
    "status" "ReportStatus" NOT NULL DEFAULT 'OPEN',
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListingReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationReview" (
    "id" TEXT NOT NULL,
    "scholarshipId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "previousStatus" "VerificationStatus" NOT NULL,
    "newStatus" "VerificationStatus" NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerificationReview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModerationActionLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModerationActionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttributionTouchpoint" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "landingPath" TEXT,
    "referrer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AttributionTouchpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralInvite" (
    "id" TEXT NOT NULL,
    "inviterUserId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "email" TEXT,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferralConversion" (
    "id" TEXT NOT NULL,
    "inviteId" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,
    "convertedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralConversion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");

-- CreateIndex
CREATE INDEX "AuthProviderAccount_userId_idx" ON "AuthProviderAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthProviderAccount_provider_providerAccountId_key" ON "AuthProviderAccount"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx" ON "RefreshToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "SessionToken_tokenHash_key" ON "SessionToken"("tokenHash");

-- CreateIndex
CREATE INDEX "SessionToken_userId_idx" ON "SessionToken"("userId");

-- CreateIndex
CREATE INDEX "SessionToken_expiresAt_idx" ON "SessionToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE INDEX "PasswordResetToken_expiresAt_idx" ON "PasswordResetToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Scholarship_slug_key" ON "Scholarship"("slug");

-- CreateIndex
CREATE INDEX "Scholarship_title_idx" ON "Scholarship"("title");

-- CreateIndex
CREATE INDEX "Scholarship_provider_idx" ON "Scholarship"("provider");

-- CreateIndex
CREATE INDEX "Scholarship_hostCountry_idx" ON "Scholarship"("hostCountry");

-- CreateIndex
CREATE INDEX "Scholarship_deadlineAt_idx" ON "Scholarship"("deadlineAt");

-- CreateIndex
CREATE INDEX "Scholarship_status_idx" ON "Scholarship"("status");

-- CreateIndex
CREATE INDEX "Scholarship_verificationStatus_idx" ON "Scholarship"("verificationStatus");

-- CreateIndex
CREATE INDEX "Scholarship_status_createdAt_idx" ON "Scholarship"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipRequirement_scholarshipId_orderIndex_key" ON "ScholarshipRequirement"("scholarshipId", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipBenefit_scholarshipId_orderIndex_key" ON "ScholarshipBenefit"("scholarshipId", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationStep_scholarshipId_orderIndex_key" ON "ApplicationStep"("scholarshipId", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipFaq_scholarshipId_orderIndex_key" ON "ScholarshipFaq"("scholarshipId", "orderIndex");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipTag_name_key" ON "ScholarshipTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ScholarshipTag_slug_key" ON "ScholarshipTag"("slug");

-- CreateIndex
CREATE INDEX "UserReminder_reminderAt_status_idx" ON "UserReminder"("reminderAt", "status");

-- CreateIndex
CREATE INDEX "UserReminder_userId_idx" ON "UserReminder"("userId");

-- CreateIndex
CREATE INDEX "NotificationLog_status_createdAt_idx" ON "NotificationLog"("status", "createdAt");

-- CreateIndex
CREATE INDEX "NotificationLog_userId_idx" ON "NotificationLog"("userId");

-- CreateIndex
CREATE INDEX "PartnerApplication_status_createdAt_idx" ON "PartnerApplication"("status", "createdAt");

-- CreateIndex
CREATE INDEX "PartnerApplication_userId_idx" ON "PartnerApplication"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PartnerApplicationAnswer_applicationId_questionKey_key" ON "PartnerApplicationAnswer"("applicationId", "questionKey");

-- CreateIndex
CREATE INDEX "PartnerApplicationStatusLog_applicationId_createdAt_idx" ON "PartnerApplicationStatusLog"("applicationId", "createdAt");

-- CreateIndex
CREATE INDEX "ListingReport_status_createdAt_idx" ON "ListingReport"("status", "createdAt");

-- CreateIndex
CREATE INDEX "VerificationReview_scholarshipId_createdAt_idx" ON "VerificationReview"("scholarshipId", "createdAt");

-- CreateIndex
CREATE INDEX "ModerationActionLog_entityType_entityId_idx" ON "ModerationActionLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "ModerationActionLog_createdAt_idx" ON "ModerationActionLog"("createdAt");

-- CreateIndex
CREATE INDEX "AttributionTouchpoint_userId_createdAt_idx" ON "AttributionTouchpoint"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "AttributionTouchpoint_sessionId_idx" ON "AttributionTouchpoint"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralInvite_code_key" ON "ReferralInvite"("code");

-- CreateIndex
CREATE INDEX "ReferralInvite_inviterUserId_idx" ON "ReferralInvite"("inviterUserId");

-- CreateIndex
CREATE UNIQUE INDEX "ReferralConversion_inviteId_referredUserId_key" ON "ReferralConversion"("inviteId", "referredUserId");

-- AddForeignKey
ALTER TABLE "AuthProviderAccount" ADD CONSTRAINT "AuthProviderAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionToken" ADD CONSTRAINT "SessionToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipRequirement" ADD CONSTRAINT "ScholarshipRequirement_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipBenefit" ADD CONSTRAINT "ScholarshipBenefit_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationStep" ADD CONSTRAINT "ApplicationStep_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipFaq" ADD CONSTRAINT "ScholarshipFaq_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipSource" ADD CONSTRAINT "ScholarshipSource_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipToTag" ADD CONSTRAINT "ScholarshipToTag_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipToTag" ADD CONSTRAINT "ScholarshipToTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "ScholarshipTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedScholarship" ADD CONSTRAINT "SavedScholarship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedScholarship" ADD CONSTRAINT "SavedScholarship_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReminder" ADD CONSTRAINT "UserReminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserReminder" ADD CONSTRAINT "UserReminder_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationLog" ADD CONSTRAINT "NotificationLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerApplication" ADD CONSTRAINT "PartnerApplication_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerApplication" ADD CONSTRAINT "PartnerApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerApplication" ADD CONSTRAINT "PartnerApplication_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerApplicationAnswer" ADD CONSTRAINT "PartnerApplicationAnswer_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PartnerApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerApplicationStatusLog" ADD CONSTRAINT "PartnerApplicationStatusLog_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PartnerApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationAttachment" ADD CONSTRAINT "ApplicationAttachment_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "PartnerApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingReport" ADD CONSTRAINT "ListingReport_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingReport" ADD CONSTRAINT "ListingReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingReport" ADD CONSTRAINT "ListingReport_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationReview" ADD CONSTRAINT "VerificationReview_scholarshipId_fkey" FOREIGN KEY ("scholarshipId") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VerificationReview" ADD CONSTRAINT "VerificationReview_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModerationActionLog" ADD CONSTRAINT "ModerationActionLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttributionTouchpoint" ADD CONSTRAINT "AttributionTouchpoint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralInvite" ADD CONSTRAINT "ReferralInvite_inviterUserId_fkey" FOREIGN KEY ("inviterUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralConversion" ADD CONSTRAINT "ReferralConversion_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "ReferralInvite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralConversion" ADD CONSTRAINT "ReferralConversion_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
