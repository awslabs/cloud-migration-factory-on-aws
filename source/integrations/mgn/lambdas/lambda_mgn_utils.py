import os
import boto3
import botocore.exceptions
import logging

log = logging.getLogger()
log.setLevel(logging.INFO)

def assume_role(account_id, region):
    sts_client = boto3.client('sts', region_name=region)
    role_arn = 'arn:aws:iam::' + account_id + ':role/CMF-MGNAutomation'
    log.info("Creating new session with role: {}".format(role_arn))

    # Call the assume_role method of the STSConnection object and pass the role
    # ARN and a role session name.

    try:
        user = sts_client.get_caller_identity()['Arn']
        log.info('Logged in as: ' + user)
        sessionname = user.split('/')[1]
        response = sts_client.assume_role(RoleArn=role_arn, RoleSessionName=sessionname)
        credentials = response['Credentials']
        return credentials
    except botocore.exceptions.ClientError as e:
        log.error(str(e))
        return {"ERROR": e}


def get_session(creds, region):
    try:
        session = boto3.Session(
            region_name=region,
            aws_access_key_id=creds['AccessKeyId'],
            aws_secret_access_key=creds['SecretAccessKey'],
            aws_session_token=creds['SessionToken']
        )
        return session
    except botocore.exceptions.ClientError as e:
        log.error(str(e))
        return {"ERROR": e}
    

def build_logging_message(prefix, account_id, region, job_id):
    message = f"{prefix}{account_id}, Region: {region}"
    if job_id:
        message = f"{message} - Job Id is: {job_id}"
    return message


def build_pid_message(add_error, suffix):
    pid_message = f"Pid: {str(os.getpid())}"
    if add_error:
        pid_message = f"{pid_message} - ERROR: "
    pid_message = f"{pid_message}{suffix}"

    return pid_message


def handle_error(error, error_prefix, message_suffix, log_error):
    err = str(error)
    if ":" in str(error):
        err = ''
        msgs = str(error).split(":")[1:]
        for msg in msgs:
            err = err + msg
    msg = f"{error_prefix}{err}{message_suffix}"
    if log_error:
        log.error(error)
    else:
        log.error(msg)
    return msg


def handle_error_with_pid(error, message_suffix):
    error_prefix = f"ERROR: "
    pid_prefix = f"Pid: {str(os.getpid())} - {error_prefix}"
    err = str(error)
    if ":" in str(error):
        err = ''
        msgs = str(error).split(":")[1:]
        for msg in msgs:
            err = err + msg
    log.error(f"{pid_prefix}{err}{message_suffix}")
    return f"{error_prefix}{err}{message_suffix}"


def chunks(l, n):
    for i in range(0, n):
        yield l[i::n]